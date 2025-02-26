import React, { useState } from "react";

const CashIn = () => {
    const [agentMobile, setAgentMobile] = useState("");
    const [amount, setAmount] = useState("");
    const [pin, setPin] = useState("");
    const [message, setMessage] = useState("");

    const handleCashIn = async (e) => {
        e.preventDefault();
        setMessage("");

        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("Please log in to proceed.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/transactions/cash-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ agentMobile, amount: Number(amount), pin }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage(`Cash-In successful! New Balance: ${result.balance} Taka`);
                setAgentMobile("");
                setAmount("");
                setPin("");
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setMessage("Error processing transaction. Try again.");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-96 card shadow-lg p-8">
                <h1 className="text-3xl font-bold text-red-700 text-center mb-6">Cash-In</h1>
                <form onSubmit={handleCashIn} className="flex flex-col gap-4">
                    <div className="form-control">
                        <label className="label">Agent Mobile Number:</label>
                        <input
                            type="text"
                            value={agentMobile}
                            onChange={(e) => setAgentMobile(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">Amount:</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">Enter PIN:</label>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {message && <p className="text-red-500 text-center mt-2">{message}</p>}

                    <button type="submit" className="btn bg-red-600 text-white mt-4 w-full">
                        Cash-In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CashIn;
