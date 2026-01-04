import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import styled from "styled-components";
import { RiGoogleLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/Authentication";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const [photoURL, setPhotoURL] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const {
    createUserWithEmailAndPasswordFunc,
    signInWithEmailFunc,
    setUser,
    setLoading,
  } = useContext(AuthContext);

  const handelRegister = (e) => {
    e.preventDefault();

    const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 6 characters with upper & lower case."
      );
      return;
    }

    createUserWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        const user = res.user;
        setUser(user);

        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          setLoading(false);
          toast.success("Registration Successful!");

          const newUser = {
            name,
            email,
            image: photoURL,
            role,
          };

          fetch("https://movie-master-server-nine.vercel.app/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newUser),
          });

          navigate("/");
        });
      })
      .catch(() => toast.error("Registration failed"));
  };

  const handelGoogleRegister = () => {
    signInWithEmailFunc()
      .then((res) => {
        setUser(res.user);
        setLoading(false);

        fetch("https://movie-master-server-nine.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name: res.user.displayName,
            email: res.user.email,
            role: "user",
          }),
        });

        toast.success("Google registration successful");
        navigate("/");
      })
      .catch(() => toast.error("Google registration failed"));
  };

  return (
    <StyledWrapper>
      <div className="container">
        <form onSubmit={handelRegister} className="form">
          <p className="title">Register</p>

          <input
            placeholder="Name"
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            placeholder="Email"
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            placeholder="Photo URL"
            className="input"
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            required
          />

          {/* ✅ ROLE FIELD — TEXT ONLY */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-transparent text-[wheat] border-b border-[wheat] py-4 px-2 appearance-none outline-none cursor-pointer"
          >
            <option value="user" className="text-black">User</option>
            <option value="admin" className="text-black">Admin</option>
          </select>


          <input
            placeholder="Password"
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn main-btn" type="submit">
            Register
          </button>

          <Link onClick={handelGoogleRegister} className="btn google-btn">
            <span className="google-icon">
              <RiGoogleLine />
            </span>
            Register with Google
          </Link>

          <div className="links">
            <Link to="/login">Already have an account?</Link>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </StyledWrapper>
  );
};

export default Register;

const StyledWrapper = styled.div`
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form {
    width: 100%;
    max-width: 400px;
    background: linear-gradient(to bottom, #424242, #212121);
    padding: 2rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }

  .title {
    color: wheat;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  .input {
    margin: 0.6rem 0;
    padding: 1rem 0.5rem;
    width: 100%;
    background: transparent;
    color: wheat;
    border: none;
    border-bottom: 1px solid wheat;
    outline: none;
  }
/* ROLE SELECT – FIX DOT DOT ISSUE */
.role-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background: transparent;
  color: wheat;
  cursor: pointer;

  /* 🔑 CRITICAL FIX */
  overflow: visible;
  text-overflow: unset;
  white-space: normal;

  line-height: 1.4;
}

/* DROPDOWN OPTIONS */
.role-select option {
  background-color: #212121;
  color: wheat;
}

  .btn {
    margin-top: 1.2rem;
    height: 3rem;
    background: wheat;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.1rem;
  }

  .google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
  }

  .google-icon {
    background: white;
    color: #db4437;
    border-radius: 50%;
    padding: 5px;
  }

  .links {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
  }

  .links a {
    color: white;
    text-decoration: none;
  }
`;
