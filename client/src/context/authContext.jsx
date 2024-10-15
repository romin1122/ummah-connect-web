import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { makeRequest } from '../axiosfunctions';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const data = localStorage.getItem('user');
  let parsed;
  try {
    parsed = JSON.parse(data);
  } catch (error) {
    parsed = null;
  }
  const [currentUser, setCurrentUser] = useState(parsed);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    makeRequest.get('/users/validate').then((res) => {
      if (!res.data) {
        localStorage.removeItem('user');
        setCurrentUser(null);
      }
      return data;
    });
  }, []);

  const login = async (inputs) => {
    const res = await makeRequest.post('/auth/login', inputs);

    setCurrentUser(res.data);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
