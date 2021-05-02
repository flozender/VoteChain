import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ResRoute = ({ currentUser, path, component, ...props }) => {
  return (
    <Route
      exact
      path={path}
      render={() => (!currentUser ? <Redirect to="/login" /> : component)}
      {...props}
    />
  );
};

export default ResRoute;
