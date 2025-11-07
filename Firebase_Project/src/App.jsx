import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleSignup = () => {
    // Simple signup without Firebase
    const userData = { email, password };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    alert("Signup Successful! (Local Storage)");
  };

  const handleLogin = () => {
    // Simple login without Firebase
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      alert("Login Successful!");
    } else {
      alert("Invalid credentials!");
    }
  };

  if (user) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Welcome {user.email}!</h1>
        <button onClick={() => setUser(null)}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>My App</h1>
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '10px', margin: '5px 0' }}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '10px', margin: '5px 0' }}
      />
      <button 
        onClick={handleSignup}
        style={{ padding: '10px 20px', margin: '5px' }}
      >
        Sign Up
      </button>
      <button 
        onClick={handleLogin}
        style={{ padding: '10px 20px', margin: '5px' }}
      >
        Login
      </button>
    </div>
  );
}

export default App;