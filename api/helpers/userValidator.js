import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const userValidator = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(200).json(false);

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, userInfo) => {
    if (err) return res.status(200).json(false);
    else {
      res.status(200).json(true);
    }
  });
};
