import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // agar token nahi hai to redirect kar do login pe
    return <Navigate to="/login" replace />;
  }

  // agar token hai to children ko dikhao
  return children;
}

export default PrivateRoute;


//2 way:
// components/PrivateRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   return token ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;
