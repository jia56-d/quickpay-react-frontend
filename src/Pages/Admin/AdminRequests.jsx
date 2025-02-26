import React, { useState, useEffect } from "react";

const AdminRequests = () => {
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch("https://quickpay-server-1.onrender.com/api/admin/pending-requests", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setRequests(data);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchRequests();
    }, []);

    const handleApprove = async (requestId) => {
        setMessage("");
    
        const token = localStorage.getItem("token");
        if (!token) return;
    
        try {
            const response = await fetch(`https://quickpay-server-1.onrender.com/api/admin/approve-request/${requestId}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            });
    
            const result = await response.json();
            setMessage(result.message);
            setRequests(requests.filter((req) => req._id !== requestId));
        } catch (error) {
            setMessage("Error approving request.");
        }
    };
    

    const handleReject = async (requestId) => {
        setMessage("");

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch(`https://quickpay-server-1.onrender.com/api/admin/reject-request/${requestId}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = await response.json();
            setMessage(result.message);
            setRequests(requests.filter((req) => req._id !== requestId));
        } catch (error) {
            setMessage("Error rejecting request.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Pending Requests</h1>

            {message && <p className="text-red-500">{message}</p>}

            {requests.length === 0 ? (
                <p>No pending requests.</p>
            ) : (
                <ul>
                    {requests.map((request) => (
                        <li key={request._id} className="border p-4 my-2">
                            <p><strong>Agent:</strong> {request.agentId.name} ({request.agentId.mobile})</p>
                            <p><strong>Request Type:</strong> {request.type === "cash-request" ? "Cash Request (100,000 Taka)" : `Withdraw Request (${request.amount} Taka)`}</p>
                            <div className="flex gap-4 mt-2">
                                <button onClick={() => handleApprove(request._id)} className="btn bg-green-500 text-white">Approve</button>
                                <button onClick={() => handleReject(request._id)} className="btn bg-red-500 text-white">Reject</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminRequests;
