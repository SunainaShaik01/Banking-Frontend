import React, { useState, useEffect } from 'react';
import DebtService from '../api/DebtService';
import { useNavigate } from 'react-router-dom';

const DebtTracker = () => {
  const [debts, setDebts] = useState([]);
  const [newDebt, setNewDebt] = useState({
    type: '',
    amount: '',
    interestRate: '',
    minPayment: '',
    additionalPayment: '',
    userId: parseInt(localStorage.getItem('userId'))
  });
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const userDebts = await DebtService.getDebtsByUserId(localStorage.getItem('userId'));
        setDebts(userDebts);
        generateSuggestions(userDebts);
      } catch (error) {
        console.error('Failed to fetch debts:', error);
      }
    };

    fetchDebts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDebt((prevDebt) => ({
      ...prevDebt,
      [name]: value,
    }));
  };

  const formattedDebt = {
    ...newDebt,
    amount: parseFloat(newDebt.amount),
    interestRate: parseFloat(newDebt.interestRate),
    minPayment: parseFloat(newDebt.minPayment),
    additionalPayment: parseFloat(newDebt.additionalPayment || 0),
  };

  const addDebt = async () => {
    try {
      const savedDebt = await DebtService.saveDebt(formattedDebt);
      setDebts([...debts, savedDebt]);
      setNewDebt({
        type: '',
        amount: '',
        interestRate: '',
        minPayment: '',
        additionalPayment: ''
      });
      generateSuggestions([...debts, savedDebt]);
    } catch (error) {
      console.error('Failed to save debt:', error);
    }
  };

  const generateSuggestions = (debts) => {
    const totalInterestRate = debts.reduce((acc, debt) => acc + parseFloat(debt.interestRate), 0);
    const newSuggestions = [];

    if (debts.length > 1) {
      newSuggestions.push('Consider using the Snowball method: pay off the smallest debt first.');
    }
    if (totalInterestRate / debts.length > 15) {
      newSuggestions.push('Try the Avalanche method: pay off the highest interest rate debt first.');
    }

    setSuggestions(newSuggestions);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', background: '#f9f9f9' }}>
      <button onClick={() => navigate('/home')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#007bff' }}>⬅ Back</button>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Debt Tracker</h2>
      <div style={{ padding: '15px', background: 'white', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Add New Debt</h3>
        <input type="text" name="type" placeholder="Debt Type" value={newDebt.type} onChange={handleInputChange} style={inputStyle} />
        <input type="number" name="amount" placeholder="Debt Amount ($)" value={newDebt.amount} onChange={handleInputChange} style={inputStyle} />
        <input type="number" name="interestRate" placeholder="Interest Rate (%)" value={newDebt.interestRate} onChange={handleInputChange} style={inputStyle} />
        <input type="number" name="minPayment" placeholder="Minimum Payment ($)" value={newDebt.minPayment} onChange={handleInputChange} style={inputStyle} />
        <input type="number" name="additionalPayment" placeholder="Additional Payment ($)" value={newDebt.additionalPayment} onChange={handleInputChange} style={inputStyle} />
        <button onClick={addDebt} style={buttonStyle}>Add Debt</button>
      </div>
      <h3>Current Debts</h3>
      <div style={{ maxHeight: '200px', overflowY: 'auto', background: 'white', padding: '10px', borderRadius: '8px' }}>
        {debts.length > 0 ? (
          debts.map((debt, index) => (
            <div key={index} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
              <strong>{debt.type}</strong> - ${debt.amount} at {debt.interestRate}% interest
            </div>
          ))
        ) : (
          <p>No debts added yet.</p>
        )}
      </div>
      <h3>Repayment Strategies</h3>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  background: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default DebtTracker;
