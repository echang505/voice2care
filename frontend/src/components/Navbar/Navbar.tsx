import React from 'react';
import type {PageStatus} from '../../types';

interface NavbarProps {
  setPageStatus: React.Dispatch<React.SetStateAction<PageStatus>>;
}

const Navbar: React.FC<NavbarProps> = ({setPageStatus}) => {
    return (
        <>
            <nav className="bg-white shadow-md px-5 py-6">
                <div className="w-full px-6 flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600">Voice2Care Logo</div>
                    <div className="flex items-center space-x-4">
                        <p className="flex pr-50"> Currently Logged In as: </p>
                        <a href="#login" className="hover:text-blue-600">Log In/Register</a>

                    </div>
                </div>
            </nav>        
            <nav className="bg-white shadow-md px-5 py-6">
                <div className="w-full px-6 flex items-center justify-between">
                    <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
                        <a
                            href="#homePage"
                            className="hover:text-blue-600"
                            onClick={() => setPageStatus("homePage")}
                        >
                            Home
                        </a>
                        <a
                            href="#makeRequestPage"
                            className="hover:text-blue-600"
                            onClick={() => setPageStatus("makeRequestPage")}
                        >
                            Make New Request
                        </a>
                        <a
                            href="#managementBoardPage"
                            className="hover:text-blue-600"
                            onClick={() => setPageStatus("managementBoardPage")}
                        >
                            Management Board
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;