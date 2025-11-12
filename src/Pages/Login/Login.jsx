import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import { RiGoogleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/Authentication';

// FIREBASE AUTH PROVIDER
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  // AUTHPROVIDER CONTEXT
  const {

    signInWithEmailAndPasswordFunc,
    signInWithEmailFunction,
    setUser,
    setLoading,
    user

  } = useContext(AuthContext)

  const location = useLocation();
  const form = location.state || '/';
  
  // USE NAVIGATE
    const navigate = useNavigate();
    
    if(user){
      navigate('/')
    }

  console.log(location);

  // HANDEL LOGIN
  const handelLogIn = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    console.log({ name, email, password })

    // FIREBASE REGISTER WITH EMAIL & PASSWORD AUTHENTICATION
    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        console.log(res.user)
        setUser(res.user)
        navigate(form);
        toast.success('Login succesfully')
      })
      .catch((error) => {
        console.log(error.message);
        toast.error('Login faild')
      });
  }

  // FIREBASE REGISTER WITH GOOGLE AUTHENTICATION
  const handelGoogleLogIn = () => {
    signInWithEmailFunction()
      .then(res => {
        console.log(res.user)
        setLoading(false)
        navigate(form);
        toast.success('Login with google succesfully')
      })
      .catch(error => {
        console.log(error.message)
        toast.error('Login faild')
      })
  }
  return (
    <StyledWrapper>
      <div className="container">
        <form onSubmit={handelLogIn} className="form" action="#">
          <p className="title">Login</p>

          {/* EMAIL */}
          <input placeholder="Email" className="username input" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          {/* PASSWORD */}
          <input placeholder="Password" className="password input" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {/* LOGIN BUTTON */}
          <button className="btn" type="submit">Login</button>

          {/* GOOGLE LOGIN */}
          <Link onClick={handelGoogleLogIn} className="btn google-btn" type="button">
            <span className="google-icon"><RiGoogleLine /></span>
            Login with Google
          </Link>

          {/* FORGOT PASSWORD */}
          <div className='links'>
            <Link className='text-white'>Forgot Password ?</Link>
            <Link to='/register' className='text-white'>Register</Link>
          </div>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  ::selection {
    background-color: gray;
  }

  .container {
    min-height: calc(100vh - 160px); 
    display: flex;
    justify-content: center; 
    align-items: center;        
    padding: 1rem;
    margin: auto;
    box-sizing: border-box;

  .form {
    width: 100%;
    max-width: 400px;
    background-image: linear-gradient(to bottom, #424242, #212121);
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 0.5rem;
    padding: 2rem;
    box-sizing: border-box;
    margin: 0; 
  }

  .title {
    color: wheat;
    margin: 3rem 0;
    font-size: 2rem;
    text-align: center;
  }

  .input {
    margin: 0.5rem 0;
    padding: 1rem 0.5rem;
    width: 100%;
    background-color: inherit;
    color: wheat;
    border: none;
    outline: none;
    border-bottom: 1px solid wheat;
    transition: all 400ms;
    box-sizing: border-box;
  }

  .input:hover {
    background-color: #424242;
    border-radius: 0.5rem;
  }

  .btn {
    height: 3rem;
    width: 100%;
    margin-top: 1.5rem;
    background-color: wheat;
    border-radius: 0.5rem;
    border: none;
    font-size: 1.2rem;
    transition: all 400ms;
    cursor: pointer;
    box-shadow: 0 0 10px antiquewhite, 0 0 10px antiquewhite;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    color: #B22222;
    font-weight: bold;
  }

  .btn:hover {
    background-color: antiquewhite;
    box-shadow: none;
    color: #ff0000;
  }

  .google-btn {
    background-color: wheat;
    color: black;
  }

  .google-icon {
    background-color: white;
    border-radius: 50%;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #DB4437;
    font-size: 1.3rem;
  }

  .links {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .links a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .links a:hover {
    color: #B22222;
  }

  /* RESPONSIVE STYLES */
  @media (max-width: 768px) {
    .form {
      padding: 1.5rem;
    }

    .title {
      font-size: 1.8rem;
      margin: 2rem 0;
    }

    .btn {
      font-size: 1rem;
      height: 2.8rem;
    }
  }

  @media (max-width: 480px) {
    .form {
      padding: 1rem;
    }

    .title {
      font-size: 1.5rem;
      margin: 1.5rem 0;
    }

    .btn {
      font-size: 0.95rem;
      height: 2.5rem;
    }

    .links {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export default Login;
