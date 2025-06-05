import { useState } from 'react';

import { Link, useNavigate  } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    
    const isAuthenticated = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-dark-DEFAULT text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                <div className="flex items-center">
                    <Link to="/" className="text-xl font-bold">
                    Crypto Exchange
                    </Link>
                </div>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-dark-light">
                        Dashboard
                        </Link>
                        <Link to="/market" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-dark-light">
                        Market
                        </Link>
                        <Link to="/wallet" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-dark-light">
                        Wallet
                        </Link>
                        <Link to="/transactions" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-dark-light">
                        Transactions
                        </Link>
                        <button 
                        onClick={handleLogout}
                        className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700"
                        >
                        Logout
                        </button>
                    </>
                    ) : (
                    <>
                        <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-dark-light">
                        Login
                        </Link>
                        <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium bg-primary-DEFAULT hover:bg-primary-dark">
                        Register
                        </Link>
                    </>
                    )}
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-dark-light"
                    >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    </button>
                </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
            <div className="md:hidden bg-dark-light">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {isAuthenticated ? (
                    <>
                    <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-dark-DEFAULT">
                        Dashboard
                    </Link>
                    <Link to="/market" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-dark-DEFAULT">
                        Market
                    </Link>
                    <Link to="/wallet" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-dark-DEFAULT">
                        Wallet
                    </Link>
                    <Link to="/transactions" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-dark-DEFAULT">
                        Transactions
                    </Link>
                    <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700"
                    >
                        Logout
                    </button>
                    </>
                ) : (
                    <>
                    <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-dark-DEFAULT">
                        Login
                    </Link>
                    <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium bg-primary-DEFAULT hover:bg-primary-dark">
                        Register
                    </Link>
                    </>
                )}
                </div>
            </div>
            )}
        
        </nav>
    );
};

export default Navbar;