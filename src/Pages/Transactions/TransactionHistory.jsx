import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const TransactionHistory = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("https://quickpay-server-1.onrender.com/api/transactions/history", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();

                if (Array.isArray(data)) {
                    setTransactions(data);
                } else {
                    setTransactions([]);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
            setLoading(false);
        };

        fetchTransactions();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-red-700">Transaction History</h1>

            {loading ? (
                <p>Loading...</p>
            ) : transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <table className="table-auto w-full mt-4 border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Mobile Number</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Transaction ID</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx._id} className="border">
                                <td className="px-4 py-2">
                                    {tx.timestamp ? new Date(tx.timestamp).toLocaleString() : "N/A"}
                                </td>
                                <td className="px-4 py-2">
                                    {tx.senderId?._id === user.id
                                        ? tx.transactionType === "cash-out"
                                            ? "Cash-Out"
                                            : "Sent"
                                        : tx.transactionType === "cash-in"
                                        ? "Cash-In"
                                        : "Received"}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {tx.senderId?._id === user.id
                                        ? tx.recipientId?.mobile || "N/A"
                                        : tx.senderId?.mobile || "N/A"}
                                </td>
                                <td className="px-4 py-2 text-center">{tx.amount} Taka</td>
                                <td className="px-4 py-2">{tx.transactionId}</td>
                                <td className="px-4 py-2">{tx.status || "Completed"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransactionHistory;
