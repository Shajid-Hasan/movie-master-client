import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import LoginButton from '../Button/Login Button/LoginButton';
import RegisterButton from '../Button/Register Button/RegisterButton';
import styled from 'styled-components';
import { AuthContext } from '../../Context/Authentication';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';

const Navbar = () => {
  const { user, setUser, signOutFunc, loading } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(false);

  // HANDLE SIGNOUT
  const handelSignOut = () => {
    signOutFunc()
      .then(() => {
        toast.success('Signed out successfully');
        setUser(null);
        setOpenDropdown(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const links = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-[#FF1E1E] font-semibold border-b-2 border-[#FF1E1E]' : 'text-[#fff] hover:text-[#FF1E1E]'}>Home</NavLink></li>
      <li><NavLink to="/allmovies" className={({ isActive }) => isActive ? 'text-[#FF1E1E] font-semibold border-b-2 border-[#FF1E1E]' : 'text-[#fff] hover:text-[#FF1E1E]'}>All Movies</NavLink></li>
      {
        user && (<li><NavLink to="/mycollections" className={({ isActive }) => isActive ? 'text-[#FF1E1E] font-semibold border-b-2 border-[#FF1E1E]' : 'text-[#fff] hover:text-[#FF1E1E]'}>My Collections</NavLink></li>)
      }
      {
        user && (<li><NavLink to="/addmovie" className={({ isActive }) => isActive ? 'text-[#FF1E1E] font-semibold border-b-2 border-[#FF1E1E]' : 'text-[#fff] hover:text-[#FF1E1E]'}>Add Movie</NavLink></li>)
      }
      {
        user && (<li><NavLink to="/updatemovie" className={({ isActive }) => isActive ? 'text-[#FF1E1E] font-semibold border-b-2 border-[#FF1E1E]' : 'text-[#fff] hover:text-[#FF1E1E]'}>Update Movie</NavLink></li>)
      }
    </>
  );


  return (
    <StyledWrapper>
      <div className="navbar bg-[#0b0b0b] shadow-sm px-5">
        {/* LEFT */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost mobile-menu-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex="-1" className="menu menu-sm dropdown-content submenu">
              {links}
            </ul>
          </div>
          <Link to="/" className="logo text-xl font-bold ml-3 text-white">
            MOVIE MASTER
          </Link>
        </div>

        {/* CENTER LINKS */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* RIGHT SECTION */}
        {loading ? <Loading/> 
        
        : user ? (
          <div className="navbar-end relative">
            {/* Profile picture */}
            <img
              src={user?.photoURL || 'https://via.placeholder.com/88'}
              alt="User"
              className="h-10 w-10 rounded-full border-2 border-[#FF1E1E] cursor-pointer"
              onClick={() => setOpenDropdown(!openDropdown)}
            />

            {/* DROPDOWN*/}
            {openDropdown && (
              <div className="absolute right-0 mt-35 w-52 bg-[#1f1f1f] rounded-lg shadow-lg border border-gray-700 z-50">
                <div className="p-3 border-b border-gray-600 text-white text-sm">
                  <p className="font-semibold">{user?.displayName}</p>
                  <p className="text-gray-400 text-xs">{user.email}</p>
                </div>
                <button
                  onClick={handelSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#2c2c2c] rounded-b-lg"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="navbar-end gap-2">
            <Link to="/login">
              <LoginButton />
            </Link>
            <Link to="/register">
              <RegisterButton />
            </Link>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .logo {
    display: inline-block;
    font-size: 1.5rem;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #ff0000, #8b0000, #ff0000);
    -webkit-background-clip: text;
    color: transparent;
    animation: glowText 2s ease-in-out infinite, fadeIn 1.5s ease-in;
  }

  @keyframes glowText {
    0%, 100% {
      text-shadow: 0 0 10px #ff0000, 0 0 20px #8b0000, 0 0 40px #ff0000;
    }
    50% {
      text-shadow: 0 0 20px #ff4444, 0 0 40px #ff0000, 0 0 60px #ff4444;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.8) rotateX(30deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotateX(0deg);
    }
  }

  @media (max-width: 1024px) {
    .navbar {
      padding: 0.5rem 1rem;
    }
    .navbar-end {
      gap: 1rem;
    }
    .logo {
      font-size: 1.3rem;
      margin: 0 auto;
    }
    .navbar-center {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      align-items: center;
    }
    .navbar-start {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 0.5rem;
    }
    .navbar-end {
      margin-top: 0.5rem;
      gap: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    .logo {
      font-size: 1.1rem;
    }
    .navbar-end {
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }
    .navbar-end a {
      width: 100%;
    }
  }

  /* Hide mobile menu icon and submenu on large devices */
  @media (min-width: 1024px) {
    .mobile-menu-btn,
    .submenu {
      display: none !important;
    }
  }

  /* Submenu design for small and medium devices */
  .submenu {
    background-color: #292929;
    border-radius: 0.5rem;
    padding: 0.5rem 0;
    width: 180px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 100%;
    left: 0;
    list-style: none;
    display: none;
    flex-direction: column;
    transition: all 0.3s ease;
    z-index: 50;
  }

  .dropdown:focus-within .submenu {
    display: flex;
  }

  .submenu li {
    padding: 0.5rem 1rem;
    text-align: center;
  }

  .submenu li a {
    color: #fff;
    text-decoration: none;
    display: block;
    transition: color 0.3s ease;
  }

  .submenu li a:hover {
    color: #FF1E1E;
  }

  /* Make mobile menu icon (hamburger) color white */
  .mobile-menu-btn svg {
    color: #fff;
  }
`;

export default Navbar;
