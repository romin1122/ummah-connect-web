import { Link, Navigate, useNavigate } from 'react-router-dom';
import './login.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';

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

const Login = () => {
  //Temporary
  const { login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [caughtErr, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setErr(null);

    if (e.target.name == 'username' && validateUsername(e.target.value))
      e.target.classList.remove('invalidInput');
    if (e.target.name == 'password' && validatePassword(e.target.value))
      e.target.classList.remove('invalidInput');

    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    if (e.target.name == 'username' && !validateUsername(e.target.value))
      e.target.classList.add('invalidInput');
    if (e.target.name == 'password' && !validatePassword(e.target.value))
      e.target.classList.add('invalidInput');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      setInputs({ username: '', password: '' });
      navigate('/');
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className='login'>
      <div className='card'>
        <div className='left'>
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            cupiditate dolores repudiandae voluptas veritatis nam, maiores nihil
            nulla. Unde ea, laboriosam repellendus aut dolorum non temporibus
            consequuntur quae maiores odit cupiditate
          </p>
          <span>Don't have an account?</span>
          <Link to='/register'>
            <button>Register</button>
          </Link>
        </div>
        <div className='right'>
          <h1>Login</h1>
          <form action=''>
            <input
              type='text'
              placeholder='Username'
              name='username'
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

            <span>{caughtErr && caughtErr}</span>

            <button
              onClick={handleLogin}
              disabled={
                !validateUsername(inputs.username) ||
                !validatePassword(inputs.password)
              }
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
