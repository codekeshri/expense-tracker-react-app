import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const profileHandler = () => {
    navigate("/profile");
  };

  return (
    <div>
      <div>
        Welcome to Expense Tracker!!! Your Profile is incomplete.
        <a href="" onClick={profileHandler}>
          Complete Now
        </a>
      </div>
    </div>
  );
};
