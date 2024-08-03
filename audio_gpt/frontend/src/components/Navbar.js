import React from 'react';


export default function Navbar() {
    return (
        <nav className="bg-[#333] overflow-hidden">
            <ul className="list-none m-0 p-0 overflow-hidden">
                <li className='class="text-xl font-bold"'>
                    <a href="/" className="float-left block text-[#f2f2f2] text-center px-4 py-3.5 no-underline hover:bg-[#ddd] hover:text-black">Home</a>
                </li>
                <li className='class="text-xl font-bold"'>
                    <a href="/chat" className="float-left block text-[#f2f2f2] text-center px-4 py-3.5 no-underline hover:bg-[#ddd] hover:text-black">Chat</a>
                </li>
            </ul>
        </nav>
    );
}
