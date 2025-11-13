import React, { useContext, useState} from 'react';
import { Link, Navigate, useNavigate} from 'react-router';
import styled from 'styled-components';
import { RiGoogleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/Authentication';
import { updateProfile } from 'firebase/auth';


const Register = () => {
    const [photoURL, setPhotoURL] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // USE NAVIGATE
    const navigate = useNavigate();

    // AUTHPROVIDER CONTEXT
    const { 
        createUserWithEmailAndPasswordFunc,
        signInWithEmailFunc,
        setUser,
        setLoading
    } = useContext(AuthContext)

    // HANDEL REGISTER
    const handelRegister = (e) => {
        e.preventDefault();
        const name = e.target.name?.value.trim()
        const email = e.target.email?.value.trim();
        const photoURL = e.target.photo?.value.trim();
        const password = e.target.password?.value.trim();
        // console.log({ displayName, email, photoURL, password });

        // PASSWORD VALIDATION
        const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!regExp.test(password)) {
            toast.error(
                "Password must be at least 6 characters long, include at least one uppercase letter and one lowercase letter."
            );
            return;
        }

        
        createUserWithEmailAndPasswordFunc(email, password)
            .then(res => {
                const user = res.user;
                console.log(user);
                setUser(user);

                // UPDATE PROFILE
                updateProfile(user, {
                    displayName: name || "",
                    photoURL: photoURL || "",
                })
                    .then(() => {
                        setLoading(false)
                        toast.success('Registration Successful & Profile Updated!');
                      const newUser = {
                        name,
                        email,
                        image: photoURL
                      }

                      console.log(user)

                      // CREATE USER IN THE DATABASE
                      fetch('https://movie-master-server-nine.vercel.app/users', {
                        method: 'POST',
                        headers: {
                          'content-type': 'application/json'
                        },
                        body: JSON.stringify(newUser)
                      })
                        .then(res => res.json())
                        .then(data => {
                          console.log('Data after user save', data)
                        })
                    })
                        navigate('/');
                    })
                    .catch(error => {
                        console.log(error.message);
                        toast.error("Profile update failed!");
                    });
                  }


        // FIREBASE REGISTER WITH GOOGLE AUTHENTICATION
        const handelGoogleRegister = () => {
            console.log("google")
            signInWithEmailFunc()
                .then(res => {
                    console.log(res.user)
                    setLoading(false)
                    setUser(res.user)
                    toast.success('Register with google succesfully')
                
                  fetch('https://movie-master-server-nine.vercel.app/users', {
                    method: 'POST',
                    headers: {
                      'content-type': 'application/json'
                    },
                    body: JSON.stringify({name : res.user.displayName, email : res.user.email})
                  })
                    .then(res => res.json())
                    .then(data => {
                      console.log('Data after user save', data)
                    })
                })
                .catch(error => {
                console.log(error.message)
                toast.error('Registration faild')
                })
                navigate('/')
        }

    return (
        <StyledWrapper>
            <div className="container">
                <form onSubmit={handelRegister} className="form">
                    <p className="title">Register</p>

                    {/* NAME */}
                    <input placeholder="Name" className="username input" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

                    {/* EMAIL */}
                    <input placeholder="Email" className="username input" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    {/* PHOTO URL */}
                    <input placeholder="Photo URL" className="username input" type="text" name="photo" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} required />

                    {/* PASSWORD */}
                    <input placeholder="Password" className="password input" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    {/* Register Button */}
                    <button className="btn main-btn" type="submit">Register</button>

                    {/* REGISTER WITH GOOGLE */}
                    <Link onClick={handelGoogleRegister} className="btn google-btn" type="button">
                        <span className="google-icon"><RiGoogleLine /></span>
                        Register with Google
                    </Link>

                    {/* LINKS */}
                    <div className='links'>
                        <a href="/" className='text-white'>Already have an account?</a>
                        <Link to='/login' className='text-white'>Login</Link>
                    </div>
                </form>
            </div>
        </StyledWrapper>
    );
}

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
}

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
  }

  .btn:hover {
    background-color: antiquewhite;
    box-shadow: none;
  }

  .main-btn {
    color: #B22222;
    font-weight: bold;
    letter-spacing: 0.5px;
    transition: color 0.4s ease, transform 0.3s ease;
  }

  .main-btn:hover {
    transform: scale(1.05);
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

export default Register;

