import React from 'react';

const ClosedTradesSVG = ({ children }) => (
  <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="600" fill="#0A0A0A" />
    <text x="20" y="50" fill="#FF00FF" fontFamily="Orbitron, Arial" fontSize="20">PAST ORDERS</text>
    <rect x="20" y="80" width="360" height="470" rx="10" fill="none" stroke="#00FFFF" strokeWidth="2" opacity="0.8" />
    <rect x="280" y="560" width="100" height="30" rx="5" fill="#00FF00" opacity="0.8" pointerEvents="none" />
    <text x="290" y="580" fill="#0A0A0A" fontFamily="Orbitron, Arial" fontSize="12">[> RETURN]</text>
    {children}
  </svg>
);

export default ClosedTradesSVG;