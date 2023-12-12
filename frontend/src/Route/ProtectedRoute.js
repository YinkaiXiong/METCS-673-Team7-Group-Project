import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useUser } from '../Login/UserContext';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate('/', { replace: true }); // Redirect to login if user is not logged in
    return null; // Return null if user is not authenticated
  }

  return <Route {...rest} element={<Element />} />;
};

export default ProtectedRoute;
