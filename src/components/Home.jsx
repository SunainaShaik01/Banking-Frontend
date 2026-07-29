import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import TransactionService from "../api/TransactionService";

const Home = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    // Clear token or any session storage
    localStorage.removeItem("token");
    navigate("/");
  };

  
  useEffect(() => {
    fetchBalance();
  }, [userId]);

    const fetchBalance = async() => {
      const response = await TransactionService.homeBalance(userId);
      setBalance(response);
    }

  return (
    <div className="home-container">
      <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
        <h1>Welcome to National Bank</h1>
        <p style={{margin:0}}></p>
      </div>

      <div style={{
        marginBottom: "16px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        padding: "16px",
        borderRadius: "8px",
        background: "linear-gradient(to right, rgb(0 117 255), rgb(68 70 173))",
        color: "white",
        textAlign: "center"
      }}>
        Account Balance: ${balance}
      </div>

      <div className="card-container">
        <div className="card" onClick={() => navigate("/expense-tracker")}>
          <h3>Expense Tracker</h3>
        </div>
        <div className="card" onClick={() => navigate("/trends")}>
          <h3>Trends</h3>
        </div>
        <div className="card" onClick={() => navigate("/debt-tracker")}>
          <h3>Debt Tracker</h3>
        </div>
        <div className="card" onClick={() => navigate("/transaction")}>
          <h3>Transaction</h3>
        </div>
        <div className="card" onClick={() => navigate("/investment-insights")}>
          <h3>Investment Insights</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;