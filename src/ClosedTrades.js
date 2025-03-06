import React from 'react';
import ClosedTradesSVG from './ClosedTradesSVG';

const ClosedTrades = ({ trade, allTrades, goBack }) => {
  const closedTrades = allTrades.filter(t => t.status === 'closed');

  return (
    <div style={{ position: 'relative', width: '400px', height: '600px', margin: '0 auto' }}>
      <ClosedTradesSVG>
        <foreignObject x="20" y="80" width="360" height="470">
          <div
            style={{
              width: '100%',
              height: '100%',
              overflowY: 'auto', // Vertical scroll
              padding: '10px',
              boxSizing: 'border-box',
            }}
          >
            {closedTrades.length > 0 ? (
              closedTrades.map((t, i) => (
                <p
                  key={i}
                  style={{ 
                    color: '#00FF00', 
                    fontFamily: 'Orbitron', 
                    fontSize: '14px', 
                    margin: '0 0 10px 0', // Spacing between lines
                    padding: '0',
                    whiteSpace: 'nowrap', // Prevent wrapping
                  }}
                >
                  {t.asset} | {t.riskLevel.toUpperCase()} | {t.bidAmount} MSOL | BUY: {t.buyPrice} | SELL: {t.sellPrice} | [CLOSED]
                </p>
              ))
            ) : (
              <p style={{ color: '#FF0000', fontFamily: 'Orbitron', fontSize: '14px', margin: '0', padding: '0' }}>
                NO CLOSED ORDERS
              </p>
            )}
          </div>
        </foreignObject>
        <foreignObject x="280" y="560" width="100" height="30">
          <button
            onClick={goBack}
            style={{ 
              width: '100%', 
              height: '100%', 
              background: 'none', 
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
      </ClosedTradesSVG>
    </div>
  );
};

export default ClosedTrades;