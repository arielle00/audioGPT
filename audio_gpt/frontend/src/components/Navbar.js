import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="block text-[#f2f2f2] px-4 py-3.5 hover:bg-[#ddd] hover:text-black"
    style={{ display: 'inline-block' }}
  >
    {children}
  </a>
));

export default function Navbar() {
  return (
    <nav className="bg-[#333] fixed top-0 left-0 w-full z-10 h-16">
      <div className="flex justify-between items-center p-4 h-full">
        <ul className="flex list-none m-0 p-0">
          <li className="text-xl">
            <a href="/home" className="block text-[#f2f2f2] text-center px-4 py-3.5 no-underline hover:bg-[#ddd] hover:text-black">Home</a>
          </li>
          <li className="text-xl">
            <a href="/home/chat" className="block text-[#f2f2f2] text-center px-4 py-3.5 no-underline hover:bg-[#ddd] hover:text-black">Chat</a>
          </li>
        </ul>
        <div className="relative">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              <i className="fas fa-user" style={{ fontSize: '24px' }}></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="/settings">Settings</Dropdown.Item>
              <Dropdown.Item href="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}
