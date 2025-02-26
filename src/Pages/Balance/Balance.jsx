import React, { useState, useEffect } from "react";

const BalanceInquiry = () => {
    const [balance, setBalance] = useState(null);
    const [totalMoney, setTotalMoney] = useState(null);
    const [adminIncome, setAdminIncome] = useState(null);
    const [accountType, setAccountType] = useState("");
    const [showBalance, setShowBalance] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBalance = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch("https://quickpay-server-1.onrender.com/api/balance", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();

                setAccountType(data.accountType);
                if (data.accountType === "admin") {
                    setTotalMoney(data.totalMoney);
                    setAdminIncome(data.adminIncome);
                } else {
                    setBalance(data.balance);
                }
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
            setLoading(false);
        };

        fetchBalance();
    }, []);

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-96 card shadow-lg p-8">
                <h1 className="text-3xl font-bold text-red-700 text-center mb-6">Balance Inquiry</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {accountType === "user" && (
                            <div className="text-center">
                                <p className="text-lg font-semibold">Your Balance</p>
                                <p
                                    className="text-2xl font-bold cursor-pointer"
                                    onClick={() => setShowBalance(!showBalance)}
                                >
                                    {showBalance ? `${balance} Taka` : "••••••"}
                                </p>
                            </div>
                        )}

                        {accountType === "agent" && (
                            <div className="text-center">
                                <p className="text-lg font-semibold">Your Earnings</p>
                                <p
                                    className="text-2xl font-bold cursor-pointer"
                                    onClick={() => setShowBalance(!showBalance)}
                                >
                                    {showBalance ? `${balance} Taka` : "••••••"}
                                </p>
                            </div>
                        )}

                        {accountType === "admin" && (
                            <div className="text-center">
                                <p className="text-lg font-semibold">Total Money in System</p>
                                <p className="text-2xl font-bold">{totalMoney} Taka</p>

                                <p className="text-lg font-semibold mt-4">Admin Income</p>
                                <p className="text-2xl font-bold">{adminIncome} Taka</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BalanceInquiry;
