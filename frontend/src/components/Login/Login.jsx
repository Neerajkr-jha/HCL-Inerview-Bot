import { useState } from "react";
// 1. Import useNavigate
import { Link, useNavigate } from "react-router-dom"; 
import Logo from "../../assets/logoix.png";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); // 🔹 state for errors
  // 2. Initialize the navigate function
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // reset old errors before new attempt

    try {
      const response = await fetch("https://backend-for-interview-prep.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage("Wrong username or password ❌"); // invalid credentials
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
        return; // stop execution here
      }

      const data = await response.json();
      console.log("Server response:", data);

      // Example: Save token to localStorage if provided
      // localStorage.setItem("token", data.token);

      // Redirect to '/select' if login successful
      navigate("/select");
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">
      {/* Login Box */}
      <div className="w-full max-w-sm p-8 bg-gray-100 rounded-2xl shadow-md border border-purple-300">
        <h2 className="text-2xl font-semibold text-center mb-2">Log in</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Your AI coach to ace every interview.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-black rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-black rounded-md"
          />

          {/* 🔹 Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white rounded-full font-medium hover:bg-purple-600 transition"
          >
            Continue
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
