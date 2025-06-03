import React from 'react';
import { Button } from '../Button/Button';
import type { PageStatus } from '../../types';

interface NavbarProps {
    setPageStatus: React.Dispatch<React.SetStateAction<PageStatus>>;
}

const Navbar: React.FC<NavbarProps> = ({ setPageStatus }) => {
    return (
        <>
            <div className="bg-white sticky top-0 z-50 shadow-md" >
                <nav className="bg-gradient-to-b from-white-300 to-white-400 shadow-md px-5 py-15">
                    <div className="w-full px-6 flex items-center justify-between">
                        <div className="text-2xl font-bold text-blue-600">Voice2Care Logo</div>
                        <div className="flex items-center space-x-4">
                            <p className="flex pr-50"> Currently Logged In as: </p>
                            <Button variant="ghost">
                                <a href="#login" className="hover:text-blue-600">Log In/Register</a>
                            </Button>
                        </div>
                    </div>
                </nav>
                <div>
                    
                </div>
                <nav className="bg-gradient-to-b from-white-300 to-white-400 shadow-md px-5 py-1">
                    <div className="w-full px-6 flex items-center justify-between">
                        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
                            <Button variant="ghost">
                                <a
                                    href="#homePage"
                                    className="hover:text-blue-600"
                                    onClick={() => setPageStatus("homePage")}
                                >
                                    Home
                                </a>
                            </Button>
                            <Button variant="ghost"> 
                                <a
                                    href="#makeRequestPage"
                                    className="hover:text-blue-600"
                                    onClick={() => setPageStatus("makeRequestPage")}
                                >
                                    Make New Request
                                </a>
                            </Button>
                            <Button variant="ghost"> 
                                <a
                                    href="#managementBoardPage"
                                    className="hover:text-blue-600"
                                    onClick={() => setPageStatus("managementBoardPage")}
                                >
                                    Management Board
                                </a>
                            </Button>

                        </div>
                    </div>
                </nav>
            </div>

        </>
    );
};

export default Navbar;