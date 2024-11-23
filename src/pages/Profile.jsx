import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fillData = async () => {
      try {
        const idToken = "1tiUzS42thhIqRxyPNEo7c9X5ky2";
        const res = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDB_xv6dB9fyCD97pI4UeFDSFuz-qig94A",
          { idToken },
          { headers: { "Content-Type": "application/json" } }
        );
        const userData = res.data.users[0];
      } catch (error) {
        toast.error(error.message);
      }
    };
    fillData();
  }, []);

  const nameInputHandler = (e) => {
    console.log("name input");
    setName(e.target.value);
  };

  const urlInputHandler = (e) => {
    console.log("url input");
    setUrl(e.target.value);
  };

  const updateHandler = async () => {
    const obj = {
      idToken: localStorage.getItem("idToken"),
      name: name,
      url: url,
    };

    try {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDB_xv6dB9fyCD97pI4UeFDSFuz-qig94A",
        obj,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Your profile has been updated successfully");
      console.log(res);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const logoutHandler = () => {
    navigate("/");
  };

  return (
    <div>
      <h4>Contact Details</h4>
      <span>Winners never quit, Quitters never win.</span>
      <br />
      <label>Full Name </label>
      <input type="text" value={name} onChange={nameInputHandler} />
      <br />
      <label>Photo URL </label>
      <input type="text" value={url} onChange={urlInputHandler} />
      <br />
      <br />
      <button onClick={updateHandler}>Update</button>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};
