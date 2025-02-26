import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [showBalance, setShowBalance] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {userData ? (
        <div className="mt-4">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Mobile:</strong> {userData.mobile}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Account Type:</strong> {userData.accountType}</p>

          <p 
            className="cursor-pointer text-lg font-semibold mt-2"
            onClick={() => setShowBalance(!showBalance)}
          >
            <strong>Balance:</strong> {showBalance ? `${userData.balance} Taka` : "••••••"}
          </p>
          <p className="text-sm text-gray-500">(Click to reveal balance)</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
