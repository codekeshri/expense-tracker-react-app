import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };

  const usernameInputHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  // on signup i want to save user-details in Firebase. and redirect to signin

  const url = !isSignup
    ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDB_xv6dB9fyCD97pI4UeFDSFuz-qig94A"
    : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDB_xv6dB9fyCD97pI4UeFDSFuz-qig94A";

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });

      console.log("singnup successful", res.data);
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        console.error(
          "Error if:",
          error.response.data.error.message,
          error.response.data
        );
      } else {
        console.error("Error else:", error.message);
      }
    }
  };

  const signinHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      navigate("/home");
      console.log("signin successful", email, password, res.data);
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        console.error(
          "Error during sign up:",
          error.response.data.error.message
        );
      } else {
        console.error("Error during sign up:", error.message);
      }
    }
  };

  const linkToggle = (e) => {
    e.preventDefault();
    setIsSignup(!isSignup);
    console.log("linkToggle");
  };

  return (
    <div>
      <h5>Expense Tracker App</h5>
      <div className="signup">
        {isSignup && (
          <input
            type="text"
            className="input"
            onChange={usernameInputHandler}
            placeholder="username"
            value={username}
          />
        )}
        <br />
        <input
          type="text"
          className="input"
          onChange={emailInputHandler}
          placeholder="your email"
          value={email}
        />
        <br />
        <input
          type="text"
          className="input"
          onChange={passwordHandler}
          placeholder="password"
          value={password}
        />
        <br />
        <br />
        <button
          className="input btn btn-outline-secondary"
          onClick={isSignup ? signupHandler : signinHandler}
        >
          {isSignup ? "Register" : "Login"}
        </button>
        <br />
        <a href="http://localhost:5173/" onClick={linkToggle}>
          {isSignup ? "Click here to Login" : "Click here to Signup"}
        </a>
      </div>
    </div>
  );
};
