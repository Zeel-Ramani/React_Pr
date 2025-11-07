import React, { useState } from 'react';
import { Signup } from './Signup';
import { Login } from './Login';
import { styles } from '../Styles/styles';

let Auth = ({ setUser }) => {
  let [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button 
          style={{...styles.button, marginRight: '10px'}}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button 
          style={styles.button}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      {isLogin ? (
        <Login setUser={setUser} />
      ) : (
        <Signup setUser={setUser} />
      )}
    </div>
  );
};

export { Auth };