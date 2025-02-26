import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import { getUserRole } from "../utils/auth";
import SendMoney from "../Pages/Transactions/SendMoney";
import CashIn from "../Pages/Transactions/CashIn";
import CashOut from "../Pages/Transactions/CashOut";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import TransactionHistory from "../Pages/Transactions/TransactionHistory";
import BalanceInquiry from "../Pages/Balance/Balance";
import AgentRequests from "../Pages/Agent/AgentRequests";
import AdminRequests from "../Pages/Admin/AdminRequests";
import AgentRequestHistory from "../Pages/Agent/AgentTransactionHistory";
import AgentWithDrawRequest from "../Pages/Agent/AgentWithDrawRequest";
import AdminUserList from "../Pages/Admin/AdminUserList";
import AdminTransactionHistory from "../Pages/Admin/AdminTransactionHistory";

const PrivateRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem("token");
    const userRole = getUserRole();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            {
                path: "/dashboard",
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
            },
            {
                path: "/send-money",
                element: (
                    <PrivateRoute>
                        <SendMoney />
                    </PrivateRoute>
                ),
            },
            {
                path: "/cash-in",
                element: (
                    <PrivateRoute>
                        <CashIn />
                    </PrivateRoute>
                ),
            },
            {
                path: "/cash-out",
                element: (
                    <PrivateRoute>
                        <CashOut />
                    </PrivateRoute>
                ),
            },
            {
                path: "/transactions",
                element: (
                    <PrivateRoute>
                        <TransactionHistory />
                    </PrivateRoute>
                ),
            },
            {
                path: "/balance",
                element: (
                    <PrivateRoute>
                        <BalanceInquiry />
                    </PrivateRoute>
                ),
            },
            {
                path: "/admin",
                element: (
                    <PrivateRoute requiredRole="admin">
                        <AdminDashboard />
                    </PrivateRoute>
                ),
            },
            {
                path: "/admin/users",
                element: <PrivateRoute><AdminUserList /></PrivateRoute>,
            },
            {
                path: "/admin/transactions/:userId",
                element: <PrivateRoute><AdminTransactionHistory /></PrivateRoute>,
            },
            {
                path: "/admin-requests",
                element: <PrivateRoute><AdminRequests /></PrivateRoute>,
            },
            {
                path: "/agent-requests",
                element: <PrivateRoute><AgentRequests /></PrivateRoute>,
            },
            {
                path: "/agent-withdraw-request",
                element: <PrivateRoute><AgentWithDrawRequest /></PrivateRoute>,
            },
            {
                path: "/agent-transaction",
                element: <PrivateRoute><AgentRequestHistory /></PrivateRoute>,
            },

        ],
    },
]);

export default router;
