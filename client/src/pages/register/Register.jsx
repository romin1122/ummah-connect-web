import { Link, Navigate } from 'react-router-dom';
import './register.scss';
import { AuthContext } from '../../context/authContext';
import { useContext, useState } from 'react';
import axios from 'axios';
import { makeRequest } from '../../axiosfunctions';

const validateName = (name) => {
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

const Register = () => {
  const { currentUser, login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setErr(null);

    if (e.target.name == 'username' && validateUsername(e.target.value))
      e.target.classList.remove('invalidInput');
    if (e.target.name == 'name' && validateName(e.target.value))
      e.target.classList.remove('invalidInput');
    if (e.target.name == 'email' && validateEmail(e.target.value))
      e.target.classList.remove('invalidInput');
    if (e.target.name == 'password' && validatePassword(e.target.value))
      e.target.classList.remove('invalidInput');

    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    if (e.target.name == 'username' && !validateUsername(e.target.value))
      e.target.classList.add('invalidInput');
    if (e.target.name == 'name' && !validateName(e.target.value))
      e.target.classList.add('invalidInput');
    if (e.target.name == 'email' && !validateEmail(e.target.value))
      e.target.classList.add('invalidInput');
    if (e.target.name == 'password' && !validatePassword(e.target.value))
      e.target.classList.add('invalidInput');
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    await makeRequest
      .post('/auth/register', inputs)
      .catch((err) => setErr(err.response));

    await login(inputs);
  };

  if (currentUser) return <Navigate to='/' />;

  return (
    <div className='register'>
      <div className='card'>
        <div className='left'>
          <h1>Ummah Connect.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            cupiditate dolores repudiandae voluptas veritatis nam, maiores nihil
            nulla. Unde ea, laboriosam repellendus aut dolorum non temporibus
            consequuntur quae maiores odit cupiditate
          </p>
          <span>Do you have an account?</span>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </div>
        <div className='right'>
          <h1>Register</h1>
          <form action=''>
            <input
              type='text'
              placeholder='Username'
              name='username'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <input
              type='text'
              placeholder='Name'
              name='name'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {err && <span style={{ color: 'red' }}>{err.data}</span>}

            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
