import { useState } from "react";
import axios from "axios";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isSignup, setIsSignup] = useState(false);

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

    const res = await axios.post(url, {
      email,
      username,
      password,
      returnSecureToken: true,
    });
    console.log(res.data);
    setEmail("");
    setUsername("");
    setPassword("");
  };

  const signinHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post(url, {
      username,
      password,
      returnSecureToken: true,
    });
    console.log(res.data);
    setEmail("");
    setUsername("");
    setPassword("");
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
            onChange={emailInputHandler}
            placeholder="your email"
            value={email}
          />
        )}
        <br />
        <input
          type="text"
          className="input"
          onChange={usernameInputHandler}
          placeholder="username"
          value={username}
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
