import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Signup } from "./components/Signup/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster
        toastOptions={{
          duration: 4000,
          position: "top-right",
          style: { background: "#4CAF50", color: "#fff" },
          success: {
            duration: 3000,
            style: { background: "#19543E", color: "white" },
          },
          error: {
            duration: 4000,
            style: { background: "maroon", color: "white" },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
