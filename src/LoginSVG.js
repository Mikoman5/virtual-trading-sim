import React from 'react';

const LoginSVG = ({ children }) => (
  <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="600" fill="#0A0A0A" />
    <text x="50" y="100" fill="#00FFFF" fontFamily="Orbitron, Arial" fontSize="24">[VIRTUAL TRADER]</text>
    <rect x="50" y="200" width="300" height="40" rx="5" fill="none" stroke="#00FFFF" strokeWidth="2" opacity="0.8" />
    <text x="60" y="225" fill="#FFFFFF" fontFamily="Orbitron, Arial" fontSize="16">> EMAIL:</text>
    <rect x="50" y="260" width="300" height="40" rx="5" fill="none" stroke="#00FFFF" strokeWidth="2" opacity="0.8" />
    <text x="60" y="285" fill="#FFFFFF" fontFamily="Orbitron, Arial" fontSize="16">> PASS:</text>
    <rect x="50" y="340" width="120" height="40" rx="5" fill="#00FF00" opacity="0.8" />
    <text x="65" y="365" fill="#0A0A0A" fontFamily="Orbitron, Arial" fontSize="16">[> SCAN ID]</text>
    <rect x="230" y="340" width="120" height="40" rx="5" fill="#00FF00" opacity="0.8" />
    <text x="245" y="365" fill="#0A0A0A" fontFamily="Orbitron, Arial" fontSize="16">[> REGISTER]</text>
    <line x1="0" y1="0" x2="400" y2="600" stroke="#00FFFF" strokeWidth="0.5" opacity="0.2" />
    <line x1="0" y1="600" x2="400" y2="0" stroke="#00FFFF" strokeWidth="0.5" opacity="0.2" />
    {children} {/* For inputs/buttons */}
  </svg>
);

export default LoginSVG;