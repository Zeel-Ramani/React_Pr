import React, { useState } from 'react';
import { auth } from '../Firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { styles } from '../Styles/styles';

let Signup = ({ setUser }) => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  let handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        setUser(user);
        alert("Signup successful! 🎉");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  return (
    <div style={styles.card}>
      <h2>Create Account</h2>
      
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
        onClick={handleSignup}
      >
        Sign Up
      </button>
    </div>
  );
};

export { Signup };