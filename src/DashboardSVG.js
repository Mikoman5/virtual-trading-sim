import React from 'react';

const DashboardSVG = ({ children }) => (
  <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="600" fill="#0A0A0A" />
    <text x="20" y="40" fill="#00FFFF" fontFamily="Orbitron, Arial" fontSize="20">[USER: NAME]</text>
    <rect x="20" y="70" width="360" height="60" rx="10" fill="none" stroke="#00FFFF" strokeWidth="2" opacity="0.8" />
    <text x="30" y="105" fill="#00FF00" fontFamily="Orbitron, Arial" fontSize="18">FUNDS:</text>
    <rect x="300" y="90" width="70" height="30" rx="5" fill="#00FF00" opacity="0.8" pointerEvents="none" />
    <rect x="20" y="150" width="360" height="200" rx="10" fill="none" stroke="#00FFFF" strokeWidth="2" opacity="0.8" />
    <text x="30" y="180" fill="#00FFFF" fontFamily="Orbitron, Arial" fontSize="16">AUTO-TRADE MODULE</text>
    <rect x="30" y="200" width="80" height="30" rx="5" fill="#0A0A0A" stroke="#00FF00" strokeWidth="2" pointerEvents="none" />
    <rect x="120" y="200" width="80" height="30" rx="5" fill="#0A0A0A" stroke="#00FF00" strokeWidth="2" pointerEvents="none" />
    <rect x="210" y="200" width="80" height="30" rx="5" fill="#0A0A0A" stroke="#00FF00" strokeWidth="2" pointerEvents="none" />
    <rect x="30" y="240" width="260" height="30" rx="5" fill="none" stroke="#00FFFF" strokeWidth="2" />
    <text x="40" y="260" fill="#FFFFFF" fontFamily="Orbitron, Arial" fontSize="14">BID:</text>
    <rect x="300" y="240" width="80" height="30" rx="5" fill="#00FF00" opacity="0.8" pointerEvents="none" />
    <text x="302" y="260" fill="#0A0A0A" fontFamily="Orbitron, Arial" fontSize="14">[DEPLOY]</text>
    <text x="20" y="380" fill="#FF00FF" fontFamily="Orbitron, Arial" fontSize="16">USER STATS</text>
    <rect x="20" y="400" width="360" height="150" rx="10" fill="none" stroke="#00FFFF" strokeWidth="2" opacity="0.8" />
    <text x="30" y="420" fill="#00FF00" fontFamily="Orbitron, Arial" fontSize="12">TOTAL TRADES:</text>
    <text x="30" y="440" fill="#00FF00" fontFamily="Orbitron, Arial" fontSize="12">WINS/LOSSES:</text>
    <text x="30" y="460" fill="#00FF00" fontFamily="Orbitron, Arial" fontSize="12">PROFIT/LOSS:</text>
    <text x="30" y="480" fill="#00FF00" fontFamily="Orbitron, Arial" fontSize="12">WIN RATE:</text>
    <text x="30" y="500" fill="#00FF00" fontFamily="Orbitron, Arial" fontSize="12">AVG PROFIT:</text>
    <text x="30" y="520" fill="#00FF00" fontFamily="Orbitron, Arial" fontSize="12">TOTAL VOLUME:</text>
    <rect x="280" y="560" width="100" height="30" rx="5" fill="#00FF00" opacity="0.8" pointerEvents="none" />
    <rect x="60" y="560" width="100" height="30" rx="5" fill="#00FFFF" opacity="0.8" pointerEvents="none" />
    <rect x="170" y="560" width="100" height="30" rx="5" fill="#FF00FF" opacity="0.8" pointerEvents="none" />
    {children}
  </svg>
);

export default DashboardSVG;