import React, { useState } from "react";

const SendMoney = () => {
    const [recipientMobile, setRecipientMobile] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [fee, setFee] = useState(0);

    const calculateFee = (amount) => {
        const numAmount = Number(amount);
        setFee(numAmount > 100 ? 5 : 0);
    };

    const handleSendMoney = async (e) => {
        e.preventDefault();
        setMessage("");

        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("Please log in to send money.");
            return;
        }

        try {
            const response = await fetch("https://quickpay-server-1.onrender.com/api/transactions/send-money", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ recipientMobile, amount: Number(amount) }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage(`Transaction successful! Transaction ID: ${result.transaction.transactionId}`);
                setRecipientMobile("");
                setAmount("");
                setFee(0);
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
                <h1 className="text-3xl font-bold text-red-700 text-center mb-6">Send Money</h1>
                <form onSubmit={handleSendMoney} className="flex flex-col gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipient Mobile Number:</span>
                        </label>
                        <input
                            type="text"
                            value={recipientMobile}
                            onChange={(e) => setRecipientMobile(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Amount:</span>
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                                calculateFee(e.target.value);
                            }}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {amount > 100 && (
                        <p className="text-yellow-600 text-center">
                            ⚠️ This transaction will have a fee of {fee} Taka.
                        </p>
                    )}

                    {message && <p className="text-red-500 text-center mt-2">{message}</p>}

                    <button type="submit" className="btn bg-red-600 text-white mt-4 w-full">
                        Send Money
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendMoney;
