import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch(`http://localhost:5000/api/admin/users/search?mobile=${searchTerm}`, {
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
    }, [searchTerm]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Users & Agents</h1>

            <input
                type="text"
                placeholder="Search by Phone Number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full max-w-md mb-8 input-error block mx-auto text-center"
            />

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
                            <th className="border p-2">Balance</th>
                            <th className="border p-2">Transactions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.mobile}</td>
                                <td className="border p-2 capitalize">{user.accountType}</td>
                                <td className="border p-2">{user.balance} Taka</td>
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

export default AdminUserList;
