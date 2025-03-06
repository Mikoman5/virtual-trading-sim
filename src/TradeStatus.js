import React, { useState, useEffect } from 'react';
import TradeStatusSVG from './TradeStatusSVG';

const TradeStatus = ({ trade, allTrades, goBack }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (trade && trade.status === 'open') {
      const interval = setInterval(() => {
        const now = new Date();
        const purchaseTime = new Date(trade.timestamp);
        const elapsed = now - purchaseTime;
        const totalTime = getSellInterval(trade.riskLevel);
        const remaining = Math.max(0, totalTime - elapsed);
        setTimeLeft(Math.ceil(remaining / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [trade]);

  function getSellInterval(riskLevel) {
    switch (riskLevel) {
      case 'low': return 1 * 60 * 1000;
      case 'medium': return 3 * 60 * 1000;
      case 'high': return 7 * 60 * 1000;
    }
  }

  const getMockCurrentPrice = () => trade.buyPrice + (Math.random() * 20 - 10);

  const openTrades = allTrades.filter(t => t.status === 'open');

  return (
    <div style={{ position: 'relative', width: '400px', height: '600px', margin: '0 auto' }}>
      <TradeStatusSVG>
        {openTrades.length > 0 ? (
          openTrades.map((t, i) => (
            <React.Fragment key={i}>
              <foreignObject x="110" y={135 + i * 30} width="280" height="20">
                <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '16px', margin: '0', padding: '0' }}>
                  {t.asset}
                </p>
              </foreignObject>
              <foreignObject x="110" y={165 + i * 30} width="280" height="20">
                <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '16px', margin: '0', padding: '0' }}>
                  {t.riskLevel.toUpperCase()}
                </p>
              </foreignObject>
              <foreignObject x="110" y={195 + i * 30} width="280" height="20">
                <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '16px', margin: '0', padding: '0' }}>
                  {t.bidAmount} MSOL
                </p>
              </foreignObject>
              <foreignObject x="110" y={225 + i * 30} width="280" height="20">
                <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '16px', margin: '0', padding: '0' }}>
                  {t.buyPrice} MSOL
                </p>
              </foreignObject>
              <foreignObject x="110" y={255 + i * 30} width="280" height="20">
                <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '16px', margin: '0', padding: '0' }}>
                  {t.status === 'open' ? getMockCurrentPrice().toFixed(2) : t.sellPrice} MSOL
                </p>
              </foreignObject>
              <foreignObject x="110" y={285 + i * 30} width="280" height="20">
                <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '16px', margin: '0', padding: '0' }}>
                  {t.sellParameter} MSOL
                </p>
              </foreignObject>
              <foreignObject x="110" y={315 + i * 30} width="280" height="20">
                <p style={{ color: '#00FF00', fontFamily: 'Orbitron', fontSize: '16px', margin: '0', padding: '0' }}>
                  [{t.status.toUpperCase()}] {t.status === 'open' ? `${timeLeft} SEC` : ''}
                </p>
              </foreignObject>
            </React.Fragment>
          ))
        ) : (
          <foreignObject x="50" y="150" width="300" height="20">
            <p style={{ color: '#FF0000', fontFamily: 'Orbitron', fontSize: '16px', margin: '0', padding: '0' }}>
              NO OPEN ORDERS
            </p>
          </foreignObject>
        )}
        <foreignObject x="280" y="560" width="100" height="30">
          <button
            onClick={() => {
              console.log('Return clicked from Open Orders');
              goBack();
            }}
            style={{ 
              width: '100%', 
              height: '100%', 
              background: 'transparent', 
              border: 'none', 
              color: '#0A0A0A', 
              fontFamily: 'Orbitron', 
              fontSize: '12px', 
              cursor: 'pointer', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
          >
            [> RETURN]
          </button>
        </foreignObject>
      </TradeStatusSVG>
    </div>
  );
};

export default TradeStatus