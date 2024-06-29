import React from 'react';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="nav">
            <a href="/" className="site-title">Site Name</a>
            <ul>
                <li>
                    <a href="/pricing">Pricing</a>
                </li>
            </ul>
        </nav>
    );
}
