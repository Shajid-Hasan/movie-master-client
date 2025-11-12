import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <StyledFooter>
            <div className="container">
                {/* QUICK LINK */}
                <div className="links">
                    <h4 className="font-bold">Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/allmovies">All Movies</a></li>
                        <li><a href="/mycollections">My Collections</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                {/* SOCIAL MEDIA */}
                <div className="social">
                    <h4 className="font-bold">Follow Us</h4>
                    <div className="icons">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaXTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedinIn /></a>
                    </div>
                </div>

                {/* COPYRIGHT */}
                <div className="copyright">
                    &copy; {new Date().getFullYear()} Movie Master. All rights reserved.
                </div>
            </div>
        </StyledFooter>
    );
};

const StyledFooter = styled.footer`
  background-color: #0b0b0b;
  color: #fff;
  padding: 2rem 1rem;
  font-family: sans-serif;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
  }

  .links, .social {
    flex: 1;
    min-width: 200px;
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #B22222; /* 🔥 Blood Red */
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #B22222; /* Blood Red on hover */
  }

  .icons {
    display: flex;
    gap: 1rem;
    font-size: 1.2rem;
  }

  .icons a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    background-color: #424242;
    border-radius: 50%;
    transition: all 0.3s ease;
    color: #fff;
  }

  .icons a:hover {
    background-color: #B22222; /* Blood Red hover background */
    color: #fff; /* keep icon color white */
  }

  .copyright {
    width: 100%;
    margin-top: 2rem;
    text-align: center;
    font-size: 0.9rem;
    color: #aaa;
  }

  /* RESPONSIVE STYLES */
  @media (max-width: 1024px) {
    .container {
      gap: 1.5rem;
      justify-content: space-around;
    }
    .links, .social {
      min-width: 180px;
    }
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1.5rem;
    }
    .links, .social {
      width: 100%;
    }
    .icons {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    h4 {
      font-size: 1rem;
    }
    .icons a {
      width: 30px;
      height: 30px;
      font-size: 1rem;
    }
    .copyright {
      font-size: 0.8rem;
    }
  }
`;

export default Footer;
