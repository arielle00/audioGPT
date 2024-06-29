import React from 'react';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="nav">
            <a href="/" className="site-title">Home</a>
            <ul>
                <li>
                    <a href="/chat">Chat</a>
                </li>
            </ul>
        </nav>
    );
}
