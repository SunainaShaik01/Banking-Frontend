import React, { useState, useEffect } from "react";
import TransactionService from "../api/TransactionService";
import { useNavigate } from "react-router-dom";

const TransactionPage = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("deposit");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactionHistory();
    fetchBalance();
  }, [userId]);

  const fetchTransactionHistory = async() => {
    const response = await TransactionService.transactionHistory(userId);
    setTransactions(response);
  }

  const fetchBalance = async() => {
    const response = await TransactionService.homeBalance(userId);
    setBalance(response);
  }

  const handleTransaction = async (e) => {
    e.preventDefault();
    setError("");
    
    const response = type === "deposit" 
      ? await TransactionService.deposit(userId, amount) 
      : await TransactionService.withdraw(userId, amount);

    try{
        if (response.status === 200) {
            const newTransaction = response.data;
            setTransactions([...transactions, newTransaction]);
            setAmount("");
            
            const balance = await TransactionService.balance(userId);
            setBalance(balance);
          } else {
            const errorData = response.data;
            setError(errorData.message || "Transaction failed.");
          }
    } catch (error) {
        console.error("Error saving budget:", error.response);
        throw error;
      }
  };

  const handleBackClick = () => {
    navigate("/home"); // Navigates back to home
  };

  return (     
    <div style={{ maxWidth: "500px", margin: "auto", padding: "16px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", borderRadius: "8px", backgroundColor: "rgb(237 231 231)" }}>
    <div className="back-block" onClick={handleBackClick}>
            <svg className="jss101" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{ height: "20px" }}>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
            </svg>
            <span style={{ paddingLeft: "4px" }}>Back</span>
        </div>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "16px" }}>Transaction</h2>
      <div style={{
        marginBottom: "16px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        padding: "16px",
        borderRadius: "8px",
        background: "linear-gradient(to right, #4A90E2, #8E44AD)",
        color: "white",
        textAlign: "center"
      }}>
        Balance: ${balance}
      </div>
      {error && <div style={{ color: "red", marginBottom: "8px" }}>{error}</div>}
      <form onSubmit={handleTransaction} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="number"
          style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>
        <button
          type="submit"
          style={{ background: "#3498db", color: "white", padding: "8px", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Submit
        </button>
      </form>
      <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", marginTop: "24px" }}>Transaction History</h3>
      <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #ddd", padding: "8px", borderRadius: "4px" }}>
        <ul style={{ marginTop: "8px" }}>
          {transactions && transactions.map((t, index) => (
            <li key={index} style={{ borderBottom: "1px solid #ddd", padding: "8px 0" }}>
              {t.type.toUpperCase()} - ${t.amount} <br />
              <small style={{ color: "gray" }}>{new Date(t.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionPage;
