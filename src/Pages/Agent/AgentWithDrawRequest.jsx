import React, { useState } from "react";

const AgentWithDrawRequest = () => {
    const [message, setMessage] = useState("");

    const handleWithdrawRequest = async () => {
        setMessage("");

        const token = localStorage.getItem("token");
        if (!token) return setMessage("Please log in to proceed.");

        try {
            const response = await fetch("https://quickpay-server-1.onrender.com/api/agent/withdraw-request", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
            });

            const result = await response.json();
            setMessage(result.message);
        } catch (error) {
            setMessage("Error processing request.");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-96 card shadow-lg p-8">
                <h1 className="text-3xl font-bold text-red-700 text-center mb-6">Withdraw Requests</h1>
                <button onClick={handleWithdrawRequest} className="btn bg-red-600 text-white w-full">
                    Request Withdrawal
                </button>

                {message && <p className="text-red-500 text-center mt-2">{message}</p>}
            </div>
        </div>
    );
};

export default AgentWithDrawRequest;
