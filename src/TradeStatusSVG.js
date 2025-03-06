import React from 'react';

const TradeStatusSVG = ({ children }) => (
  <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="600" fill="#0A0A0A" />
    <rect x="20" y="100" width="360" height="450" rx="10" fill="none" stroke="#00FFFF" strokeWidth="2" opacity="0.8" />
    <text x="30" y="130" fill="#00FF00" fontFamily="Orbitron, Arial" fontSize="16">ASSET:</text>
    <text x="30" y="160" fill="#00FF00" fontFamily="Orbitron, Arial" fontSize="16">RISK:</text>
    <text x="30" y="190" fill="#00FF00" fontFamily="Orbitron, Arial" fontSize="16">BID:</text>
    <text x="30" y="220" fill="#00FF00" fontFamily="Orbitron, Arial" fontSize="16">BUY:</text>
    <text x="30" y="250" fill="#00FF00" fontFamily="Orbitron, Arial" fontSize="16">CURRENT:</text>
    <text x="30" y="280" fill="#00FF00" fontFamily="Orbitron, Arial" fontSize="16">SELL:</text>
    <text x="30" y="310" fill="#00FF00" fontFamily="Orbitron, Arial" fontSize="16">STATUS:</text>
    <rect x="280" y="560" width="100" height="30" rx="5" fill="#00FF00" opacity="0.8" pointerEvents="none" />
    <text x="290" y="580" fill="#0A0A0A" fontFamily="Orbitron, Arial" fontSize="12">[> RETURN]</text>
    {children}
  </svg>
);

export default TradeStatusSVG;