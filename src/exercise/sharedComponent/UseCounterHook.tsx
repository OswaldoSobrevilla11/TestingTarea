import React from "react";
import useCounter from "./useCounter";

const UseCounterHook: React.FC = () => {
  const { count, increment, decrement } = useCounter({ initialCount: 0, step: 1 });

  return (
    <div>
      <h1 data-testid="counter">Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default UseCounterHook;
