import React from "react";
import {FaBars} from "react-icons/fa";

export default function Navbar({fixed}) {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    const handleClick = () => {
        localStorage.removeItem("jwt");
        window.location.reload();
    }

    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-2 bg-indigo-900 mb-3">
                <div className="container  mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                           href="/generate">Dall-E Image Generator
                        </a>
                        <button
                            className="text-white cursor-pointer text-xl leading-none  py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}>
                            <FaBars/>
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="example-navbar-danger">
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto justify-center">
                            <li className="nav-item">
                                <a
                                    className="px-3 py-2 flex  text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    href="/generate"><span className="ml-2">Generate</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="px-3 py-2 flex  text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    href="/gallery">
                                    <span className="ml-2">Gallery</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="px-3 py-2 flex  text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    href="/refill">
                                    <span className="ml-2">Refill</span>
                                </a>
                            </li>
                            <li className="nav-item ">
                                <button
                                    className="text-white px-3 py-2 flex ml-2 text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    onClick={handleClick}>Logout
                                </button>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}