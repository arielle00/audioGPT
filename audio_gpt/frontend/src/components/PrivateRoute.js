import React, { useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
export const PrivateRoute = ({ children}) => {
    const token =  localStorage.getItem('authToken');
        
    if (token ) {
      return children
    }
      
    return <Navigate to="/permissionDenied" />;
  }