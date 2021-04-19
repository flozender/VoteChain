import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = ({ setCurrentUser }) => {
  setCurrentUser(null);
  localStorage.removeItem('app-user');
  return <Redirect to="/" />;
};

export default Logout;
