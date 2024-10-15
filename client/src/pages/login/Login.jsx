import { Link, Navigate, useNavigate } from 'react-router-dom';
import './login.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';

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
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
            />

            <span>{caughtErr && caughtErr}</span>

            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
