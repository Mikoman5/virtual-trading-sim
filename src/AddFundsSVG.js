import React from 'react';

const AddFundsSVG = ({ children }) => (
  <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
    {/* Dark Background */}
    <rect width="400" height="600" fill="#0A0A0A" />
    
    {/* Header */}
    <text x="10" y="50" fill="#00FFFF" fontFamily="Orbitron, Arial" fontSize="20">> FUND INJECTOR</text>
    
    {/* Amount Input */}
    <rect x="50" y="200" width="300" height="40" rx="5" fill="none" stroke="#00FFFF" strokeWidth="2" opacity="0.8" />
    <text x="60" y="225" fill="#FFFFFF" fontFamily="Orbitron, Arial" fontSize="16">AMOUNT:</text>
    
    {/* Buttons */}
    <rect x="50" y="280" width="120" height="40" rx="5" fill="#00FF00" opacity="0.8" />
    <text x="65" y="305" fill="#0A0A0A" fontFamily="Orbitron, Arial" fontSize="16">[> INJECT]</text>
    <rect x="230" y="280" width="120" height="40" rx="5" fill="#FF00FF" opacity="0.8" />
    <text x="245" y="305" fill="#0A0A0A" fontFamily="Orbitron, Arial" fontSize="16">[> ABORT]</text>
    
    {/* Status Bar (static for now) */}
    <rect x="50" y="360" width="300" height="20" rx="5" fill="none" stroke="#00FFFF" strokeWidth="1" />
    <rect x="50" y="360" width="150" height="20" rx="5" fill="#00FFFF" opacity="0.3" />
    
    {children} {/* Dynamic content */}
  </svg>
);

export default AddFundsSVG;