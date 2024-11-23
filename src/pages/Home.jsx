import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const Home = () => {
  const navigate = useNavigate();
  const profileHandler = () => {
    navigate("/profile");
  };

  const verifyHandler = async () => {
    try {
      const res = await axios.post(
        // "https://identitytoolkit.googleapis.com/v1/accounts:send0obCode?key=AIzaSyDB_xv6dB9fyCD97pI4UeFDSFuz-qig94A",
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDB_xv6dB9fyCD97pI4UeFDSFuz-qig94A",
        {
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.idToken,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success(
        "Verification link to your email has been sent successfully"
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [itemInput, setItemInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("arvidce2@gmail.com");

  const itemHandler = (e) => {
    console.log("Item");
    setItemInput(e.target.value);
  };

  const amountHandler = (e) => {
    console.log("Amount");
    setAmountInput(e.target.value);
  };

  const categoryHandler = (e) => {
    console.log("category");
    setCategory(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");

    setEmail(email.replace(/[^a-zA-Z0-9]/g, ""));

    try {
      const res = await axios.post(
        `https://expense-tracker-3301e-default-rtdb.firebaseio.com/expenses/${email}.json`,
        { category: category, expenseTitle: itemInput, price: amountInput },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Expense added successfully");
      setCategory("");
      setAmountInput("");
      setItemInput("");
    } catch (error) {
      console.log("error posting expense in firebase", error);
      toast.error("error posting expense in firebase");
    }
  };

  return (
    <div>
      <div>
        Welcome to Expense Tracker!!! Your Profile is incomplete.
        <a href="" onClick={profileHandler}>
          Complete Now
        </a>
        <br />
        To claim your premium bonus credits get verified.
        <a href="" onClick={verifyHandler}>
          Verify your email
        </a>
      </div>

      <h2>Enter Your Expenses</h2>

      <form>
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter item"
            onChange={itemHandler}
            value={itemInput}
          />
          <small id="emailHelp" className="form-text text-muted">
            We will never share your these details with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            onChange={amountHandler}
            value={amountInput}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            onChange={categoryHandler}
            value={category}
          >
            <option>Food</option>
            <option>Rent</option>
            <option>Travel</option>
            <option>Entertainment</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitHandler}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
