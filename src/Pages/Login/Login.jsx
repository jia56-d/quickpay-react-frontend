import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, pin }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        return;
      }

      login(result.token);
      if (result.accountType === "admin") navigate("/admin");
      else if (result.accountType === "agent") navigate("/agent");
      else navigate("/dashboard");
    } catch (error) {
      console.error("Login Request Failed:", error);
      setError("Network error. Please check your internet connection.");
    }
  };

  return (
    <div className="h-[500px] flex justify-center items-center my-32">
      <div className="w-96 card shadow-2xl p-8">
        <h2 className="text-4xl font-bold text-red-700 mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-control w-full max-w-xs my-6">
            <label className="label"><span className="label-text">Mobile Number/Email</span></label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>

          <div className="form-control w-full max-w-xs mt-10 mb-6">
            <label className="label"><span className="label-text">5-digit PIN</span></label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input className="btn w-full text-red-700 my-4" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
