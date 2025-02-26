import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch("https://quickpay-server-1.onrender.com/api/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUsers(data);
    };

    const handleApproveAgent = async (agentId) => {
        const token = localStorage.getItem("token");
        const response = await fetch("https://quickpay-server-1.onrender.com/api/admin/approve-agent", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ agentId }),
        });

        const result = await response.json();
        setMessage(result.message);
        fetchUsers();
    };

    const handleBlockUser = async (userId) => {
        const token = localStorage.getItem("token");
        const response = await fetch("https://quickpay-server-1.onrender.com/api/admin/block-user", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ userId }),
        });

        const result = await response.json();
        setMessage(result.message);
        fetchUsers();
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-red-700">Admin Panel</h1>
            {message && <p className="text-green-600">{message}</p>}

            <table className="table-auto w-full mt-4">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Mobile</th>
                        <th className="px-4 py-2">Account Type</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="border">
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.mobile}</td>
                            <td className="px-4 py-2">{user.accountType}</td>
                            <td className="px-4 py-2 flex gap-2">
                                {user.accountType === "agent" && !user.isApproved && (
                                    <button className="btn bg-green-600 text-white" onClick={() => handleApproveAgent(user._id)}>Approve</button>
                                )}
                                <button className="btn bg-red-600 text-white" onClick={() => handleBlockUser(user._id)}>Block</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
