import React from "react";
import { render, act } from "@testing-library/react";
import useCounter from "../sharedComponent/useCounter"; 


function setup(props: { initialCount?: number; step?: number }) {
  const result = { current: {} as ReturnType<typeof useCounter> };

  function TestComponent() {
    result.current = useCounter(props);
    return null; 
  }

  render(<TestComponent />);
  return result;
}

describe("useCounter Hook", () => {
  test("should allow customization of the initial count", () => {
    const result = setup({ initialCount: 10, step: 1 });

    expect(result.current.count).toBe(10); 

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(11); 
  });

  test("should allow customization of the step", () => {
    const result = setup({ initialCount: 0, step: 5 });

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(5);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(0); 
  });
});
