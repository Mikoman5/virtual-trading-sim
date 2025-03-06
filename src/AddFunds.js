import React, { useState } from 'react';
import axios from 'axios';
import AddFundsSVG from './AddFundsSVG';

const AddFunds = ({ user, setData, data, goBack, setError }) => {
  const [amount, setAmount] = useState('');

  const addFunds = () => {
    axios.post('http://localhost:5000/api/add-funds', { userId: user.uid, amount: Number(amount) })
      .then(res => {
        setData(res.data);
        setAmount('');
        goBack();
      })
      .catch(err => setError(err.response?.data?.error || 'Add funds failed'));
  };

  return (
    <div style={{ position: 'relative', width: '400px', height: '600px', margin: '0 auto' }}>
      <AddFundsSVG>
        <foreignObject x="60" y="360" width="280" height="20">
          <p style={{ color: '#FFFFFF', fontFamily: 'Orbitron, Arial', fontSize: '12px', margin: '0', padding: '0' }}>
            AVAILABLE: {data.virtualFunds.toFixed(2)} MSOL
          </p>
        </foreignObject>
        <foreignObject x="160" y="205" width="280" height="30">
          <input
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={{
              width: '100%',
              height: '100%',
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              fontFamily: 'Orbitron, Arial',
              fontSize: '16px',
              padding: '0',
            }}
            placeholder="Enter amount"
          />
        </foreignObject>
        <foreignObject x="50" y="280" width="120" height="40">
          <button
            onClick={addFunds}
            style={{
              width: '100%',
              height: '100%',
              background: 'none',
              border: 'none',
              color: '#0A0A0A',
              fontFamily: 'Orbitron, Arial',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          />
        </foreignObject>
        <foreignObject x="230" y="280" width="120" height="40">
          <button
            onClick={goBack}
            style={{
              width: '100%',
              height: '100%',
              background: 'none',
              border: 'none',
              color: '#0A0A0A',
              fontFamily: 'Orbitron, Arial',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          />
        </foreignObject>
      </AddFundsSVG>
    </div>
  );
};

export default AddFunds;