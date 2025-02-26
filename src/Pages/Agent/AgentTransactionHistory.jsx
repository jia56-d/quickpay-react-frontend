import React, { useState, useEffect } from "react";

const AgentTransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch("https://quickpay-server-1.onrender.com/api/agent/transactions", {
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
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Agent Transaction History</h1>

            {loading ? (
                <p>Loading...</p>
            ) : transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Details</th>
                            <th className="border p-2">Amount</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn) => (
                            <tr key={txn._id}>
                                <td className="border p-2">
                                    {txn.type === "cash-request"
                                        ? "Cash Request"
                                        : txn.type === "withdraw-request"
                                        ? "Withdraw Request"
                                        : txn.senderId && txn.senderId.mobile === txn.agentMobile
                                        ? "Cash-In"
                                        : txn.recipientId && txn.recipientId.mobile === txn.agentMobile
                                        ? "Cash-Out"
                                        : "Cash-In"}
                                </td>
                                <td className="border p-2">
                                    {txn.senderId
                                        ? `From: ${txn.senderId.name} (${txn.senderId.mobile})`
                                        : txn.recipientId
                                        ? `To: ${txn.recipientId.name} (${txn.recipientId.mobile})`
                                        : "Admin"}
                                </td>
                                <td className="border p-2">{txn.amount} Taka</td>
                                <td className={`border p-2 ${txn.status === "Completed" || txn.status === "approved" ? "text-green-500" : txn.status === "rejected" ? "text-red-500" : "text-gray-500"}`}>
                                    {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
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

export default AgentTransactionHistory;
