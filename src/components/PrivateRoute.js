import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const nameSurname = localStorage.getItem('nameSurname');
  return (
    <Route
      {...rest}
      render={(props) => {
        return nameSurname !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
