import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? <Dashboard user={user} setUser={setUser} /> : <Login setUser={setUser} />}
    </div>
  );
};

export default App;