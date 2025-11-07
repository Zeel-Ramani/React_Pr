import React, { useState } from 'react';
import { auth } from '../Firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { styles } from '../Styles/styles';

let Login = ({ setUser }) => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  let handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        setUser(user);
        alert("Login successful! 🎉");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  return (
    <div style={styles.card}>
      <h2>Login to Your Account</h2>
      
      <input 
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      
      <input 
        type="password" 
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      
      <button 
        style={styles.button}
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export { Login };