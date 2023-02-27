import React from 'react';
import Logo from '../assets/images/logo512.png';

const Header = () => {
    const handleClick = () => {
        localStorage.removeItem("jwt");
        window.location.reload();
    }

    return (
        <header className="w-full h-12 flex justify-between items-center fixed z-10 bg-indigo-900">
            <div className="flex items-center">
                <img src={Logo} alt="logo" className="w-10 h-10 ml-4"/>
                <h1 className="hidden sm:block text-xl text-white ml-2">Image Generator using Dall-E</h1>
            </div>
            <ul className="flex items-center ">
                <li>
                    <a className="text-white mr-4" href='/gallery'>Gallery</a>
                </li>
                <li>
                    <button className="text-white mr-4" onClick={handleClick}>Logout</button>
                </li>
            </ul>
        </header>

    );
}

export default Header;