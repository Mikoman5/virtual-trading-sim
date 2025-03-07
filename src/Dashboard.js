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
  const [pendingTrades, setPendingTrades] = useState([]);
  const [pooledAmountFrom, setPooledAmountFrom] = useState('');
  const [pooledAmountTo, setPooledAmountTo] = useState('');
  const [lpCreationAgeFrom, setLpCreationAgeFrom] = useState('');
  const [lpCreationAgeTo, setLpCreationAgeTo] = useState('');
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState('dashboard');
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [error, setError] = useState(null);

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
      axios.get(`https://mikoman5-trading-backend.onrender.com/api/app-logs/${user.uid}`)
        .then(res => setPendingTrades(res.data));
    }, 5000);
    return () => clearInterval(interval);
  }, [user]);

  const logTrade = () => {
    if (!riskLevel || !tokenAddress || !bidAmount) {
      setError('Fill all fields');
      return;
    }
    axios.post('https://mikoman5-trading-backend.onrender.com/api/log-trade', { 
      userId: user.uid,
      tokenAddress,
      riskLevel,
      bidAmount: Number(bidAmount),
      minHolderCount: Number(minHolderCount),
      minLP: Number(minLP),
      maxTopHoldersPercent: Number(maxTopHoldersPercent)
    })
    .then(res => {
      setError('Trade logged, check APP LOGS');
      setBidAmount('');
      setTokenAddress('');
      setMinHolderCount('10');
      setMinLP('5000');
      setMaxTopHoldersPercent('50');
      setRiskLevel(null);
    })
    .catch(err => setError(err.response?.data?.error || 'Log failed'));
  };

  const runProcess = (tradeId) => {
    axios.post('https://mikoman5-trading-backend.onrender.com/api/run-process', { tradeId })
      .then(res => setError(res.data.message))
      .catch(err => setError(err.response?.data?.error || 'Process failed'));
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

        {/* Risk Level Buttons */}
        <foreignObject x="30" y="130" width="80" height="30">
          <button onClick={() => handleRiskClick('low')} style={buttonStyle('low')}>
            LOW
          </button>
        </foreignObject>
        <foreignObject x="120" y="130" width="80" height="30">
          <button onClick={() => handleRiskClick('medium')} style={buttonStyle('medium')}>
            MED
          </button>
        </foreignObject>
        <foreignObject x="210" y="130" width="80" height="30">
          <button onClick={() => handleRiskClick('high')} style={buttonStyle('high')}>
            HIGH
          </button>
        </foreignObject>

        {/* Current Pooled Amount (%) - Figma Block */}
        <foreignObject x="20" y="170" width="360" height="60">
          <div style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '12px' }}>
            <h3>CURRENT POOLED AMOUNT (%)</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <label>From</label>
                <input
                  value={pooledAmountFrom}
                  onChange={e => setPooledAmountFrom(e.target.value)}
                  style={{ width: '150px', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '12px' }}
                />
              </div>
              <div>
                <label>To</label>
                <input
                  value={pooledAmountTo}
                  onChange={e => setPooledAmountTo(e.target.value)}
                  style={{ width: '150px', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '12px' }}
                />
              </div>
            </div>
          </div>
        </foreignObject>

        {/* First LP Creation Age (sec) - Figma Block */}
        <foreignObject x="20" y="240" width="360" height="60">
          <div style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '12px' }}>
            <h3>FIRST LP CREATION AGE (sec)</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <label>From</label>
                <input
                  value={lpCreationAgeFrom}
                  onChange={e => setLpCreationAgeFrom(e.target.value)}
                  style={{ width: '150px', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '12px' }}
                />
              </div>
              <div>
                <label>To</label>
                <input
                  value={lpCreationAgeTo}
                  onChange={e => setLpCreationAgeTo(e.target.value)}
                  style={{ width: '150px', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '12px' }}
                />
              </div>
            </div>
          </div>
        </foreignObject>

        {/* New Inputs for Token Address and Buy Parameters */}
        <foreignObject x="20" y="310" width="250" height="20">
          <input
            value={tokenAddress}
            onChange={e => setTokenAddress(e.target.value)}
            placeholder="Token Address"
            style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '14px' }}
          />
        </foreignObject>
        <foreignObject x="20" y="335" width="80" height="20">
          <input
            value={minHolderCount}
            onChange={e => setMinHolderCount(e.target.value)}
            placeholder="Min Holders"
            style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '12px' }}
          />
        </foreignObject>
        <foreignObject x="110" y="335" width="80" height="20">
          <input
            value={minLP}
            onChange={e => setMinLP(e.target.value)}
            placeholder="Min LP"
            style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '12px' }}
          />
        </foreignObject>
        <foreignObject x="200" y="335" width="80" height="20">
          <input
            value={maxTopHoldersPercent}
            onChange={e => setMaxTopHoldersPercent(e.target.value)}
            placeholder="Max Top %"
            style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '12px' }}
          />
        </foreignObject>
        <foreignObject x="20" y="360" width="250" height="20">
          <input
            value={bidAmount}
            onChange={e => setBidAmount(e.target.value)}
            placeholder="Bid Amount"
            style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '14px' }}
          />
        </foreignObject>
        <foreignObject x="280" y="360" width="100" height="30">
          <button onClick={logTrade} style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#0A0A0A', fontFamily: 'Orbitron', fontSize: '12px' }}>
            [LOG TRADE]
          </button>
        </foreignObject>

        {/* APP LOGS Block */}
        <foreignObject x="20" y="400" width="360" height="120">
          <div style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '12px', height: '100%', overflowY: 'auto' }}>
            <h3>APP LOGS</h3>
            {pendingTrades.map((trade, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                {new Date(trade.timestamp).toLocaleString()}: {trade.logMessage} (Status: {trade.status})
                {trade.status === 'Pending' && (
                  <button onClick={() => runProcess(trade._id)} style={{ marginLeft: '10px', background: 'none', border: 'none', color: '#0A0A0A', fontFamily: 'Orbitron', fontSize: '10px' }}>
                    [RUN PROCESS]
                  </button>
                )}
              </div>
            ))}
          </div>
        </foreignObject>

        {/* Stats */}
        <foreignObject x="230" y="530" width="140" height="20">
          <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '12px', margin: '0', padding: '0' }}>
            {totalTrades}
          </p>
        </foreignObject>
        <foreignObject x="230" y="550" width="140" height="20">
          <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '12px', margin: '0', padding: '0' }}>
            {wins}/{losses}
          </p>
        </foreignObject>
        <foreignObject x="230" y="570" width="140" height="20">
          <p style={{ color: profitLoss >= 0 ? '#00FF00' : '#FF0000', fontFamily: 'Orbitron', fontSize: '12px', margin: '0', padding: '0' }}>
            {profitLoss >= 0 ? '+' : ''}{profitLoss} MSOL
          </p>
        </foreignObject>
        <foreignObject x="230" y="590" width="140" height="20">
          <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '12px', margin: '0', padding: '0' }}>
            {winRate}%
          </p>
        </foreignObject>
        <foreignObject x="230" y="610" width="140" height="20">
          <p style={{ color: avgProfit >= 0 ? '#00FF00' : '#FF0000', fontFamily: 'Orbitron', fontSize: '12px', margin: '0', padding: '0' }}>
            {avgProfit >= 0 ? '+' : ''}{avgProfit} MSOL
          </p>
        </foreignObject>
        <foreignObject x="230" y="630" width="140" height="20">
          <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '12px', margin: '0', padding: '0' }}>
            {totalVolume} MSOL
          </p>
        </foreignObject>

        {error && (
          <foreignObject x="20" y="530" width="360" height="20">
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