import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AdminTransactionHistory = () => {
    const { userId } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch(`https://quickpay-server-1.onrender.com/api/admin/transactions/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
            setLoading(false);
        };

        fetchTransactions();
    }, [userId]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">User Transaction History</h1>

            {loading ? (
                <p>Loading...</p>
            ) : transactions.length === 0 ? (
                <p>No transactions found for this user.</p>
            ) : (
                <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Transaction ID</th>
                            <th className="border p-2">Amount</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn) => (
                            <tr key={txn._id}>
                                <td className="border p-2">{txn.transactionId}</td>
                                <td className="border p-2">{txn.amount} Taka</td>
                                <td className={`border p-2 ${txn.status === "Completed" ? "text-green-500" : "text-red-500"}`}>
                                    {txn.status}
                                </td>
                                <td className="border p-2">{txn.createdAt ? new Date(txn.createdAt).toLocaleString() : "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminTransactionHistory;
