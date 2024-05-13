import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('receive');
  const [amount, setAmount] = useState('');
  const [history, setHistory] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // Load history data from local storage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem('history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Update local storage whenever history changes
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  const addRecord = () => {
    const newRecord = { name, date, type, amount };
    setHistory([...history, newRecord]);
    setName('');
    setDate('');
    setType('receive');
    setAmount('');
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredHistory = history.filter(record =>
    record.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="App">
      <h2>Track Management History</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} />
        <label htmlFor="type">Type:</label>
        <select id="type" value={type} onChange={e => setType(e.target.value)}>
          <option value="receive">Receive</option>
          <option value="send">Send</option>
        </select>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={addRecord}>Add Record</button>
      </div>
      <div>
        <input type="text" id="searchInput" value={searchInput} onChange={handleSearchChange} placeholder="Search in table..." />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.map((record, index) => (
            <tr key={index}>
              <td>{record.name}</td>
              <td>{record.date}</td>
              <td>{record.type}</td>
              <td>{record.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
