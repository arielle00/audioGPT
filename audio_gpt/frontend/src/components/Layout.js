import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return React.createElement(
    'div',
    null,
    React.createElement(Navbar, null),
    React.createElement(Outlet, null)
  );
};

export default Layout;
