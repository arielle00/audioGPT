import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-10">
      <Outlet />
      </div>
    </div>
  );
};

export default Layout;
