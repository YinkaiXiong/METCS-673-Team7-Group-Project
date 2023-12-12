// RoleContext.js

import React, { createContext, useState, useContext } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [roleData, setRoleData] = useState(/* initial role data */);

  return (
    <RoleContext.Provider value={{ roleData, setRoleData }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export default RoleContext;
