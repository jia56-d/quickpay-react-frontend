import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Navbar = () => {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("https://quickpay-server-1.onrender.com/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.isRead).length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    const userId = localStorage.getItem("userId");
    if (userId) {
      socket.on(`notification-${userId}`, (message) => {
        setNotifications((prev) => [{ message, isRead: false, _id: Date.now() }, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });
    }

    return () => {
      if (userId) {
        socket.off(`notification-${userId}`);
      }
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const markNotificationsAsRead = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch("https://quickpay-server-1.onrender.com/api/notifications/read-all", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnreadCount(0);
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl text-red-700">
          QuickPay
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-4">
          {userRole === "user" && (
            <>
              <li><Link to="/dashboard" className="btn btn-outline text-red-700">Dashboard</Link></li>
              <li><Link to="/send-money" className="btn btn-outline text-red-700">Send Money</Link></li>
              <li><Link to="/cash-in" className="btn btn-outline text-red-700">Cash-In</Link></li>
              <li><Link to="/cash-out" className="btn btn-outline text-red-700">Cash-Out</Link></li>
              <li><Link to="/transactions" className="btn btn-outline text-red-700">Transactions</Link></li>
            </>
          )}

          {userRole === "agent" && (
            <>
              <li><Link to="/agent-requests" className="btn btn-outline text-red-700">Request Cash</Link></li>
              <li><Link to="/agent-withdraw-request" className="btn btn-outline text-red-700">Withdraw Request</Link></li>
              <li><Link to="/agent-transaction" className="btn btn-outline text-red-700">Transactions</Link></li>
            </>
          )}

          {userRole === "admin" && (
            <>
              <li><Link to="/admin" className="btn btn-outline text-red-700">Admin Panel</Link></li>
              <li><Link to="/admin-requests" className="btn btn-outline text-red-700">Pending Requests</Link></li>
              <li><Link to="/admin/users" className="btn btn-outline text-red-700">Users/Agents</Link></li>
            </>
          )}

        </ul>

        <ul className="menu menu-horizontal px-1 flex gap-4">
          {userRole && (
            <li>
              <Link to="/balance" className="btn btn-outline text-red-700">Balance Inquiry</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end flex gap-4">
        {userRole && (
          <div className="relative">
            <button
              className="btn btn-outline text-yellow-500 relative"
              onClick={() => {
                setShowDropdown(!showDropdown);
                markNotificationsAsRead();
              }}
            >
              🔔 {unreadCount > 0 && <span className="badge badge-sm bg-red-500 text-white">{unreadCount}</span>}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-2 z-50">
                <h2 className="text-lg font-bold mb-2">Notifications</h2>
                {notifications.length === 0 ? (
                  <p className="text-gray-500">No new notifications</p>
                ) : (
                  <ul className="max-h-60 overflow-y-auto">
                    {notifications.map((note) => (
                      <li
                        key={note._id}
                        className={`p-2 border-b ${note.isRead ? "text-gray-500" : "text-black font-bold"}`}
                      >
                        {note.message}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {userRole ? (
          <button onClick={handleLogout} className="btn btn-outline text-red-700">Logout</button>
        ) : (
          <>
            <Link to="/register" className="btn text-red-700">Register</Link>
            <Link to="/login" className="btn text-red-700">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
