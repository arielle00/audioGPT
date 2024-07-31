import React from 'react';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="nav">
            <ul>
                <li>
                    <a href="/" className="site-title">Home</a>
                </li>
                <li>
                    <a href="/chat">Chat</a>
                </li>
            </ul>
        </nav>
    );
}
