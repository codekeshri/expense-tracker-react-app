import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
      toast.success(res.message);
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        toast.error(error.message);
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
      toast.success("You logged in successfully");
      console.log(res);
      localStorage.setItem("idToken", res.data.idToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("localId", res.data.localId);
      navigate("/home");
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        toast.error(error.message);
        console.error(
          "Error during sign up:",
          error.response.data.error.message
        );
      } else {
        toast.error(error.message);
        console.error("Error during sign up:", error.message);
      }
    }
  };

  const linkToggle = (e) => {
    e.preventDefault();
    setIsSignup(!isSignup);
    console.log("linkToggle");
  };

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    const payload = {
      requestType: "PASSWORD_RESET",
      email: email,
    };
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDB_xv6dB9fyCD97pI4UeFDSFuz-qig94A";
    try {
      const res = await axios.post(url, payload);
      toast.success("Mail sent to your email for password reset");
    } catch (error) {
      if (error.response) {
        toast.error(error.message);
      } else {
        toast.error(error.message);
      }
    }
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
        {!isSignup && (
          <a href="" onClick={forgotPasswordHandler}>
            Forgot Password
          </a>
        )}
        <br />
        <a href="http://localhost:5173/" onClick={linkToggle}>
          {isSignup ? "Click here to Login" : "Click here to Signup"}
        </a>
      </div>
    </div>
  );
};
