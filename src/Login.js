import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import LoginSVG from './LoginSVG';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser(user);
    } catch (error) {
      alert(error.message);
    }
  };

  const signUp = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      setUser(user);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ position: 'relative', width: '400px', height: '600px', margin: '0 auto' }}>
      <LoginSVG>
        <foreignObject x="150" y="200" width="200" height="40">
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder=""
            style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron' }}
          />
        </foreignObject>
        <foreignObject x="150" y="260" width="200" height="40">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder=""
            style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#FFFFFF', fontFamily: 'Orbitron' }}
          />
        </foreignObject>
        <foreignObject x="50" y="340" width="120" height="40">
          <button
            onClick={signIn}
            style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#0A0A0A', fontFamily: 'Orbitron' }}
          />
        </foreignObject>
        <foreignObject x="230" y="340" width="120" height="40">
          <button
            onClick={signUp}
            style={{ width: '100%', height: '100%', background: 'none', border: 'none', color: '#0A0A0A', fontFamily: 'Orbitron' }}
          />
        </foreignObject>
      </LoginSVG>
    </div>
  );
};

export default Login;