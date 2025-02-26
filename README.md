```
# QuickPay

A secure and user-friendly **Mobile Financial Service (MFS)** web application inspired by platforms like **bKash** and **Nagad**. It enables users to perform essential financial transactions, such as **sending money, cash-in, cash-out, and balance inquiries**.

## Table of Contents

- [Introduction](#introduction)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Security Measures](#security-measures)
- [License](#license)

---

## Introduction

QuickPay is an **MFS application** that allows users to register, authenticate, and conduct financial transactions securely. The system categorizes users into **three roles**:

1. **User** - Can send money, cash-in, cash-out, and check balance.
2. **Agent** - Facilitates cash-in and cash-out transactions.
3. **Admin** - Manages users, agents, and transaction monitoring.

Each transaction generates a **unique transaction ID** stored in the database.

---

## 🔗 Live Demo  

🌍 **Try QuickPay here:** [QuickPay Live](https://your-live-demo-link.com)  

(*Replace this with your actual deployment link*)

---

## Features

### User Features:
- **Secure Authentication** (JWT-based with hashed PINs)
- **Send Money** with fees based on transaction amounts
- **Cash-In** via authorized agents (no fee)
- **Cash-Out** with a **1.5% transaction fee**
- **Balance Inquiry** (initially blurred, shown on click)
- **Transaction History** (last 100 transactions)
- **Single-Device Login** enforcement

### Agent Features:
- **Register & Await Admin Approval**
- **Initial Balance** of **100,000 Taka**
- **Request Balance Recharge** from the admin
- **Earn 1% commission** on cash-out transactions
- **Transaction History** (last 100 transactions)

### Admin Features:
- **Manage Users & Agents** (approve/block)
- **Monitor System Balance & Earnings**
- **Earn commissions** from user transactions
- **View & Search Transactions**

---

## Tech Stack

- **Frontend**: React, React Router, TailwindCSS, DaisyUI
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Storage**: LocalForage (for client-side storage)
- **Real-Time Communication**: Socket.io

---

## Installation

### Prerequisites
- **Node.js** (latest LTS version)
- **MongoDB** (local or cloud instance)

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/neasher1/quickpay-react.git
   cd quickpay
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```

4. **Build the project**
   ```sh
   npm run build
   ```

5. **Run ESLint for code quality checks**
   ```sh
   npm run lint
   ```

---

## Usage

1. **User Registration**
   - Sign up with a **name, email, mobile number, PIN, and NID**.
   - Users receive an **initial bonus of 40 Taka**.

2. **Agent Registration**
   - Agents register and require **admin approval**.
   - Upon approval, agents receive **100,000 Taka** in their account.

3. **Transactions**
   - **Send Money** (min: 50 Taka, fee applies above 100 Taka)
   - **Cash-In** via agents (no fee)
   - **Cash-Out** (1.5% fee applies)
   - **Admin earnings per transaction**

4. **Security**
   - JWT-based authentication
   - **PIN Hashing** for extra security
   - **Single-device login enforcement**

---

## Configuration

### Environment Variables
Create a `.env` file in the root directory and add:

```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## API Endpoints

| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| POST   | `/api/auth/register` | Register a new user or agent |
| POST   | `/api/auth/login`    | Login user/agent/admin       |
| POST   | `/api/transaction/send-money` | Send money to another user |
| POST   | `/api/transaction/cash-in`    | Cash-in through an agent  |
| POST   | `/api/transaction/cash-out`   | Cash-out via an agent     |
| GET    | `/api/user/balance`           | Get user balance          |
| GET    | `/api/admin/transactions`     | View all transactions (admin) |

---

## Security Measures

- **JWT Authentication** with role-based access control
- **Encrypted PIN Storage** using hashing
- **Secure API Routes** with validation and error handling
- **Single-Device Login Enforcement**
- **Admin-Controlled User & Agent Management**

---


### Contributors

- **[Neasher Ahmed]** - Developer

For any queries, contact **neasher75@gmail.com**.
