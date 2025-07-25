import React, { useState } from 'react';

let Counter = () => {
  let [count, setCount] = useState(0);

  let increase = () => {
    setCount(count + 1);
  };

  let decrease = () => {
    setCount(count > 0 ? count - 1 : 0);
  };

  let reset = () => {
    setCount(0);
  };

  return (
    <div>
      <h1 className="count">{count}</h1>
      <div className="button-group">
        <button onClick={increase} className="btn increase">+</button>
        <button onClick={decrease} className="btn decrease">-</button>
        <button onClick={reset} className="btn reset">Reset</button>
      </div>
    </div>
  );
};

export default Counter;