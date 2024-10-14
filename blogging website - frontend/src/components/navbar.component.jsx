import logo from '../imgs/book.png';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between py-2 bg-black text-white shadow-md">
        {/* Logo Section */}
        <Link to="/" className="text-white">
          <img src={logo} alt="Logo" className="h-[12px] md:h-[50px]" />
        </Link>

        {/* Navigation Links (with Write) */}
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {/* Write Link */}
          <Link to="/editor" className="flex items-center space-x-1 hover:text-gray-300">
            <i className="text-xl">✍️</i>
            <p>Write</p>
          </Link>
        </div>

        {/* Search Input */}
        <div className="relative flex-grow max-w-md mx-4">
          <input
            type="text"
            placeholder="Search this site"
            className="w-full px-4 py-2 pl-10 border rounded-full bg-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <i className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</i>
        </div>

        {/* Sign In and Sign Up Section */}
        <div className="flex items-center space-x-6">
          <Link to="/signin" className="px-4 py-1 border border-white rounded-full hover:bg-gray-700 transition-colors">
            Sign In
          </Link>
          <Link to="/signup" className="px-4 py-1 bg-white text-black rounded-full hover:bg-gray-300 transition-colors">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Content Below Navbar */}
      <div className="">
        <Outlet />
      </div>
    </>
  );
}
