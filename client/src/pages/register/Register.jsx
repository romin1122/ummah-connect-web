import { Link, Navigate } from 'react-router-dom';
import './register.scss';
import { AuthContext } from '../../context/authContext';
import { useContext, useState } from 'react';
import axios from 'axios';
import { makeRequest } from '../../axiosfunctions';

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
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    await makeRequest
      .post('/auth/register', inputs)
      .catch((err) => setErr(err.response));

    await login(inputs);
  };
  console.log(err);

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
            />
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
            />
            <input
              type='text'
              placeholder='Name'
              name='name'
              onChange={handleChange}
            />

            {err && <span style={{ color: 'red' }}>err.data</span>}

            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
