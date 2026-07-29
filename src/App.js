import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ExpenseTracker from "./components/ExpenseTracker";
import Layout from "./components/Layout";
import Trends from "./components/Trends";
import DebtTracker from "./components/DebtTracker";
import TransactionPage from "./components/TransactionPage";
import FinancialGrowthInsights from "./components/FinancialGrowthInsights";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/expense-tracker" element={<Layout><ExpenseTracker /></Layout>} />
        <Route path="/trends" element={<Layout><Trends /></Layout>} />
        <Route path="/debt-tracker" element={<Layout><DebtTracker /></Layout>} />
        <Route path="/transaction" element={<Layout><TransactionPage /></Layout>} />
        <Route path="/investment-insights" element={<Layout><FinancialGrowthInsights/></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
