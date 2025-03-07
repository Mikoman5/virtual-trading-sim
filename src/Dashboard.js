import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddFunds from './AddFunds';
import TradeStatus from './TradeStatus';
import ClosedTrades from './ClosedTrades';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import DashboardSVG from './DashboardSVG';

const Dashboard = ({ user, setUser }) => {
  const [data, setData] = useState(null);
  const [riskLevel, setRiskLevel] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [minHolderCount, setMinHolderCount] = useState('10');
  const [minLP, setMinLP] = useState('5000');
  const [maxTopHoldersPercent, setMaxTopHoldersPercent] = useState('50');
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState('dashboard');
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [error, setError] = useState(null);

  // ... useEffect and other functions ...
  useEffect(() => {
    setLoading(true);
    axios.get(`https://mikoman5-trading-backend.onrender.com/api/user/${user.uid}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setData({ virtualFunds: 0, trades: [] });
        setLoading(false);
      });

    const interval = setInterval(() => {
      axios.get(`https://mikoman5-trading-backend.onrender.com/api/user/${user.uid}`)
        .then(res => setData(res.data));
    }, 5000);
    return () => clearInterval(interval);
  }, [user]);

  const startTrade = () => {
    if (!riskLevel  || !tokenAddress) {
      setError('Select a risk level and token');
      return;
    }
    axios.post('https://mikoman5-trading-backend.onrender.com/api/start-trade', { 
      userId: user.uid,
      riskLevel, 
      bidAmount: Number(bidAmount) 
      tokenAddress,
      minHolderCount: Number(minHolderCount),
      minLP: Number(minLP),
      maxTopHoldersPercent: Number(maxTopHoldersPercent)
    })
      .then(res => {
        setData(res.data);
        setRiskLevel(null);
        setBidAmount('');
        setBidAmount('');
        setTokenAddress('');
        setMinHolderCount('10');
        setMinLP('5000');
        setMaxTopHoldersPercent('50');
        setError(null);
      })
      .catch(err => setError(err.response?.data?.error || 'Trade failed'));
  };

  const logout = () => {
    signOut(auth).then(() => setUser(null));
  };

  const handleRiskClick = (level) => {
    console.log(`Clicked ${level}`);
    setRiskLevel(level);
  };

  const buttonStyle = (level) => ({
    width: '80px',
    height: '30px',
    background: 'transparent',
    border: 'none',
    color: riskLevel === level ? '#00FFFF' : '#00FF00',
    fontFamily: 'Orbitron',
    fontSize: '14px',
    boxShadow: riskLevel === level ? '0 0 10px #00FFFF' : 'none',
    animation: riskLevel === level ? 'pulse 1s infinite' : 'none',
    cursor: 'pointer',
    pointerEvents: 'all',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  // Calculate trades and stats
  const allTrades = data ? data.trades : [];
  const openTrades = allTrades.filter(t => t.status === 'open');
  const closedTrades = allTrades.filter(t => t.status === 'closed');
  const totalTrades = closedTrades.length;
  const wins = closedTrades.filter(t => t.sellPrice > t.buyPrice).length;
  const losses = totalTrades - wins;
  const profitLoss = closedTrades.reduce((acc, t) => {
    const tradeValue = (t.sellPrice - t.buyPrice) * (t.bidAmount / t.buyPrice);
    return acc + tradeValue;
  }, 0).toFixed(2);
  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : '0.0';
  const avgProfit = totalTrades > 0 ? (profitLoss / totalTrades).toFixed(2) : '0.00';
  const totalVolume = closedTrades.reduce((acc, t) => acc + t.bidAmount, 0).toFixed(2);

  if (loading) return <div>Loading...</div>;

  if (screen === 'addFunds') {
    return <AddFunds user={user} setData={setData} data={data} goBack={() => setScreen('dashboard')} setError={setError} />;
  }

  if (screen === 'tradeStatus') {
    return <TradeStatus trade={openTrades[0] || null} allTrades={allTrades} goBack={() => setScreen('dashboard')} />;
  }
  if (screen === 'closedTrades') {
    return <ClosedTrades trade={closedTrades[0] || null} allTrades={allTrades} goBack={() => setScreen('dashboard')} />;
  }

  return (
    <div style={{ position: 'relative', width: '400px', height: '600px', margin: '0 auto' }}>
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 5px #00FFFF; }
          50% { box-shadow: 0 0 15px #00FFFF; }
          100% { box-shadow: 0 0 5px #00FFFF; }
        }
      `}</style>
      <DashboardSVG>
        <foreignObject x="190" y="19" width="310" height="25">
          <h1 style={{ color: '#00FFFF', fontFamily: 'Orbitron', fontSize: '20px', margin: '0', padding: '0', paddingLeft: '5px' }}>
            {user.email.split('@')[0].toUpperCase()}
          </h1>
        </foreignObject>
        <foreignObject x="120" y="87" width="280" height="25">
          <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '18px', margin: '0', padding: '0', paddingLeft: '5px' }}>
            {data.virtualFunds.toFixed(2)} MSOL
          </p>
        </foreignObject>
        <foreignObject x="300" y="90" width="70" height="30">
          <button
            onClick={() => {
              console.log('Deposit clicked');
              setScreen('addFunds');
            }}
            style={{ 
              width: '100%', 
              height: '100%', 
              background: 'transparent', 
              border: 'none', 
              color: '#0A0A0A', 
              fontFamily: 'Orbitron', 
              fontSize: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            [>DEPOSIT]
          </button>
        </foreignObject>
        <foreignObject x="30" y="200" width="80" height="30">
          <button onClick={() => handleRiskClick('low')} style={buttonStyle('low')}>
            LOW
          </button>
        </foreignObject>
        <foreignObject x="120" y="200" width="80" height="30">
          <button onClick={() => handleRiskClick('medium')} style={buttonStyle('medium')}>
            MED
          </button>
        </foreignObject>
        <foreignObject x="210" y="200" width="80" height="30">
          <button onClick={() => handleRiskClick('high')} style={buttonStyle('high')}>
            HIGH
          </button>
        </foreignObject>
        <foreignObject x="75" y="245" width="250" height="20">
          <input
            value={bidAmount}
            onChange={e => setBidAmount(e.target.value)}
            style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '14px' }}
          />
        </foreignObject>
        <foreignObject x="75" y="270" width="250" height="20">
        <input
          value={tokenAddress}
          onChange={e => setTokenAddress(e.target.value)}
          placeholder="Token Address"
          style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '14px' }}
        />
      </foreignObject>
      <foreignObject x="75" y="295" width="80" height="20">
        <input
          value={minHolderCount}
          onChange={e => setMinHolderCount(e.target.value)}
          placeholder="Min Holders"
          style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '12px' }}
        />
      </foreignObject>
      <foreignObject x="165" y="295" width="80" height="20">
        <input
          value={minLP}
          onChange={e => setMinLP(e.target.value)}
          placeholder="Min LP"
          style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '12px' }}
        />
      </foreignObject>
      <foreignObject x="255" y="295" width="80" height="20">
        <input
          value={maxTopHoldersPercent}
          onChange={e => setMaxTopHoldersPercent(e.target.value)}
          placeholder="Max Top %"
          style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '12px' }}
        />
      </foreignObject>
        <foreignObject x="300" y="240" width="80" height="30">
          <button onClick={startTrade} style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#0A0A0A', fontFamily: 'Orbitron', fontSize: '14px' }} />
        </foreignObject>
        <foreignObject x="230" y="405" width="140" height="20">
          <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '12px', margin: '0', padding: '0' }}>
            {totalTrades}
          </p>
        </foreignObject>
        <foreignObject x="230" y="425" width="140" height="20">
          <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '12px', margin: '0', padding: '0' }}>
            {wins}/{losses}
          </p>
        </foreignObject>
        <foreignObject x="230" y="445" width="140" height="20">
          <p style={{ color: profitLoss >= 0 ? '#00FF00' : '#FF0000', fontFamily: 'Orbitron', fontSize: '12px', margin: '0', padding: '0' }}>
            {profitLoss >= 0 ? '+' : ''}{profitLoss} MSOL
          </p>
        </foreignObject>
        <foreignObject x="230" y="465" width="140" height="20">
          <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '12px', margin: '0', padding: '0' }}>
            {winRate}%
          </p>
        </foreignObject>
        <foreignObject x="230" y="485" width="140" height="20">
          <p style={{ color: avgProfit >= 0 ? '#00FF00' : '#FF0000', fontFamily: 'Orbitron', fontSize: '12px', margin: '0', padding: '0' }}>
            {avgProfit >= 0 ? '+' : ''}{avgProfit} MSOL
          </p>
        </foreignObject>
        <foreignObject x="230" y="505" width="140" height="20">
          <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '12px', margin: '0', padding: '0' }}>
            {totalVolume} MSOL
          </p>
        </foreignObject>
        {error && (
          <foreignObject x="20" y="550" width="360" height="20">
            <p style={{ color: '#FF0000', fontFamily: 'Orbitron', fontSize: '12px', margin: '0' }}>{error}</p>
          </foreignObject>
        )}
        <foreignObject x="280" y="560" width="100" height="30">
          <button onClick={logout} style={{ width: '100%', height: '100%', background: '#00FF00', border: 'none', color: '#0A0A0A', fontFamily: 'Orbitron', fontSize: '12px' }}>
            [> LOGOUT]
          </button>
        </foreignObject>
        <foreignObject x="60" y="560" width="100" height="30">
          <button
            onClick={() => {
              console.log('Open Orders clicked');
              setSelectedTrade(openTrades[0] || null);
              setScreen('tradeStatus');
            }}
            style={{ 
              width: '100%', 
              height: '100%', 
              background: 'transparent', 
              border: 'none', 
              color: '#0A0A0A', 
              fontFamily: 'Orbitron', 
              fontSize: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            [OPEN ORDERS]
          </button>
        </foreignObject>
        <foreignObject x="170" y="560" width="100" height="30">
          <button
            onClick={() => {
              console.log('Past Orders clicked');
              setSelectedTrade(closedTrades[0] || null);
              setScreen('closedTrades');
            }}
            style={{ 
              width: '100%', 
              height: '100%', 
              background: 'transparent', 
              border: 'none', 
              color: '#0A0A0A', 
              fontFamily: 'Orbitron', 
              fontSize: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            [PAST ORDERS]
          </button>
        </foreignObject>
      </DashboardSVG>
    </div>
  );
};

export default Dashboard;