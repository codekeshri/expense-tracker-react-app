import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

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
      idToken:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ0MjY5YTE3MzBlNTA3MTllNmIxNjA2ZTQyYzNhYjMyYjEyODA0NDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3QtYXV0aC1jNjY3ZiIsImF1ZCI6InJlYWN0LWF1dGgtYzY2N2YiLCJhdXRoX3RpbWUiOjE3MjQwMjQzNjYsInVzZXJfaWQiOiJuUlJLYUJDYllJVEl3SHpGWDBuZmZKQUhSTzcyIiwic3ViIjoiblJSS2FCQ2JZSVRJd0h6RlgwbmZmSkFIUk83MiIsImlhdCI6MTcyNDAyNDM2NiwiZXhwIjoxNzI0MDI3OTY2LCJlbWFpbCI6ImFydmlkY2UyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhcnZpZGNlMkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.YS95ca6oyr-eDKdzGq7JzISSichAf-PXAYo5asWdhdkHkjSegIObMru1cWcYEIfYI2kms2bIH52gXECEsK7Cs_rycOXt-IMVDgWu-QunBOkNlbJFUcuCRsOr3Q2huAI1ZdD2DptgSnl568Hn25jduPkcDbG5dtAr207WpGIdR0PQ7IwgBK7LGwc42rtsahbKjZbLUx2ncfMcVp5s-Ag-_ygYwPKXfSek86WOsoE2KM-RKcPChZtEKHGvoP4g_a2qZZh1zHdy-nXIIGy_hCxJK2hiABlndGv8mK_a_oEwVJHoMG646Cz2cs06504153vootoGWd9W-6zDWziUmfWLDw",
      name: name,
      url: url,
    };

    try {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDB_xv6dB9fyCD97pI4UeFDSFuz-qig94A",
        obj,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("user data updated successfully", res.data);
    } catch {
      console.error("error updating data", obj);
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
