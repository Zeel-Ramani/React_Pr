import React from 'react';
import { styles } from '../Styles/styles';

let Dashboard = ({ user, setUser }) => {
  return (
    <div style={styles.card}>
      <h2>Welcome! 🎉</h2>
      <p>You are logged in as:</p>
      <p><strong>{user.email}</strong></p>
      <button 
        style={styles.button}
        onClick={() => setUser(null)}
      >
        Logout
      </button>
    </div>
  );
};

export { Dashboard };