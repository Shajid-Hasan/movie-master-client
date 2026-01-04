import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import LoginButton from '../Button/Login Button/LoginButton';
import RegisterButton from '../Button/Register Button/RegisterButton';
import styled from 'styled-components';
import { AuthContext } from '../../Context/Authentication';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import ThemeToggle from './Theme Button/ThemeToggle';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Navbar = () => {
  const { user, setUser, signOutFunc, loading } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handelSignOut = () => {
    signOutFunc()
      .then(() => {
        toast.success('Signed out successfully');
        setUser(null);
        setOpenDropdown(false);
      })
      .catch((error) => toast.error(error.message));
  };

  const links = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-[#FF1E1E] font-semibold border-b-2 border-[#FF1E1E]' : 'text-[#fff] hover:text-[#FF1E1E]'}>Home</NavLink></li>
      <li><NavLink to="/allmovies" className={({ isActive }) => isActive ? 'text-[#FF1E1E] font-semibold border-b-2 border-[#FF1E1E]' : 'text-[#fff] hover:text-[#FF1E1E]'}>All Movies</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/mycollections" className={({ isActive }) => isActive ? 'text-[#FF1E1E] font-semibold border-b-2 border-[#FF1E1E]' : 'text-[#fff] hover:text-[#FF1E1E]'}>My Collections</NavLink></li>
          
          <li><NavLink to="/addmovie" className={({ isActive }) => isActive ? 'text-[#FF1E1E] font-semibold border-b-2 border-[#FF1E1E]' : 'text-[#fff] hover:text-[#FF1E1E]'}>Add Movie</NavLink></li>
          
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'text-[#FF1E1E] font-semibold border-b-2 border-[#FF1E1E]' : 'text-[#fff] hover:text-[#FF1E1E]'}>Contact</NavLink></li>
          <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-[#FF1E1E] font-semibold border-b-2 border-[#FF1E1E]' : 'text-[#fff] hover:text-[#FF1E1E]'}>Dashboard</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <StyledWrapper>
      <div className="navbar bg-[#0b0b0b] shadow-sm px-5">

        {/* LEFT */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost mobile-menu-btn">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex="-1" className="menu menu-sm dropdown-content submenu">
              {links}
            </ul>
          </div>
          <Link to="/" className="logo text-xl font-bold ml-3 text-white  whitespace-nowrap">
            MOVIE MASTER
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* RIGHT */}
        {loading ? (
          <Loading />
        ) : user ? (
          <div className="navbar-end relative flex items-center gap-3">

            {/* THEME TOGGLE FIXED */}
            <div className="theme-center">
              <ThemeToggle />
            </div>

            <img
              src={user?.photoURL || 'https://via.placeholder.com/88'}
              alt="User"
              className="h-10 w-10 rounded-full border-2 border-[#FF1E1E] cursor-pointer"
              onClick={() => setOpenDropdown(!openDropdown)}
            />

            {openDropdown && (
                <div className="absolute mt-45 w-52 bg-[#1f1f1f] rounded-lg shadow-lg border border-gray-700 z-50 animate-dropdown">

                  {/* USER NAME */}
                  <div className="p-3 border-b border-gray-600 text-white text-sm flex items-start gap-3">
                    <FaUserCircle className="text-red-500 text-xl mt-1" />
                    <div className="flex flex-col">
                      <p className="font-semibold mt-1 leading-tight">{user?.displayName}</p>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="px-3 py-2 border-b border-gray-600 text-sm flex items-center gap-3 text-gray-400">
                    <MdEmail className="text-red-400 text-lg" />
                    <p className="text-xs break-all">{user.email}</p>
                  </div>

                  {/* SIGN OUT */}
                  <button
                    onClick={handelSignOut}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 
               hover:bg-[#2c2c2c] transition-all duration-300 rounded-b-lg"
                  >
                    <FaSignOutAlt className="text-red-500" />
                    Sign Out
                  </button>

                </div>


            )}
          </div>
        ) : (
          <div className="navbar-end flex items-center gap-3">

            {/* THEME TOGGLE FIXED */}
            <div className="theme-center">
              <ThemeToggle />
            </div>

            <Link to="/login"><LoginButton /></Link>
            <Link to="/register"><RegisterButton /></Link>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

export default Navbar;

const StyledWrapper = styled.div`
  /* FIX THEME BUTTON ALIGNMENT */
  .theme-center {
    display: flex;
    align-items: center;
    margin-top: 0; /* remove extra top space */
  }

  .theme-center button {
    margin-top: 0 !important;
    transform: translateY(0);
  }

  .logo {
    font-size: 1.5rem;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #ff0000, #8b0000, #ff0000);
    -webkit-background-clip: text;
    color: transparent;
    animation: glowText 2s ease-in-out infinite, fadeIn 1.5s ease-in;
  }

  @keyframes glowText {
    0%, 100% { text-shadow: 0 0 10px #ff0000, 0 0 20px #8b0000; }
    50% { text-shadow: 0 0 20px #ff4444, 0 0 40px #ff0000; }
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: scale(0.8) rotateX(30deg); }
    100% { opacity: 1; transform: scale(1) rotateX(0deg); }
  }

  @media (min-width: 1024px) {
    .mobile-menu-btn,
    .submenu {
      display: none !important;
    }
  }
`;
