import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch("http://localhost:5000/api/admin/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Users & Agents</h1>

            {loading ? (
                <p>Loading...</p>
            ) : users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Mobile</th>
                            <th className="border p-2">Account Type</th>
                            <th className="border p-2">Transactions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.mobile}</td>
                                <td className="border p-2">{user.accountType}</td>
                                <td className="border p-2">
                                    <Link to={`/admin/transactions/${user._id}`} className="text-blue-500 underline">
                                        View Transactions
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminPanel;
