import { db } from '../helpers/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const validateName = (name) => {
  console.log(name);
  return name && name.trim().length > 0 && /^[a-zA-Z ]+$/.test(name);
};

const validateEmail = (email) => {
  return (
    email &&
    email.trim().length > 0 &&
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  );
};

const validateUsername = (username) => {
  return (
    username &&
    username.trim().length > 0 &&
    /^(?=.{3,32}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)
  );
};

const validatePassword = (password) => {
  return (
    password && password.trim().length >= 8 && password.trim().length <= 32
  );
};

export const register = (req, res) => {
  const q = 'SELECT * FROM users WHERE username = ?';

  if (
    !validateUsername(req.body.username) ||
    !validatePassword(req.body.password) ||
    !validateEmail(req.body.email) ||
    !validateName(req.body.name)
  )
    return res.status(400).json('Invalid input');

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json('User already exists!');

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      'INSERT INTO users (`username`, `email`, `password`, `name`, `profilePic`) VALUE (?)';

    const values = [
      req.body.username.toLowerCase(),
      req.body.email.toLowerCase(),
      hashedPassword,
      req.body.name,
      '/static/defaultProfile.png',
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return login(req, res);
    });
  });
};

export const login = (req, res) => {
  console.log(validateUsername(req.body.username));
  if (
    !validateUsername(req.body.username) ||
    !validatePassword(req.body.password)
  )
    return res.status(400).json('Invalid input');

  const q = 'SELECT * FROM users WHERE username = ?';
  db.query(q, [req.body.username.toLowerCase()], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json('User not found!');

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json('Wrong username or password!');

    const token = jwt.sign({ id: data[0].id }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: '30d',
    });

    const { password, id, ...others } = data[0];
    return res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie('accessToken', {
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json('User has been logged out.');
};
