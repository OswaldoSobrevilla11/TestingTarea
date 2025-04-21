import React from "react";
import { render, act } from "@testing-library/react";
import useCounter from "../sharedComponent/useCounter"; 

let result: ReturnType<typeof useCounter>;

function TestComponent({ initialCount, step }: { initialCount: number; step: number }) {
  result = useCounter({ initialCount, step });
  return null; 
}

describe("useCounter Hook", () => {
  test("initializes with the correct count", () => {
    render(<TestComponent initialCount={5} step={1} />);

    expect(result.count).toBe(5);
  });

  test("increments the count correctly", () => {
    render(<TestComponent initialCount={0} step={2} />);

    act(() => {
      result.increment(); 
    });
    expect(result.count).toBe(2);
  });

  test("decrements the count correctly", () => {
    render(<TestComponent initialCount={5} step={2} />);

    act(() => {
      result.decrement(); 
    });
    expect(result.count).toBe(3);
  });

  test("works with custom step values", () => {
    render(<TestComponent initialCount={10} step={5} />);

    act(() => {
      result.increment(); 
    });
    expect(result.count).toBe(15);

    act(() => {
      result.decrement(); 
    });
    expect(result.count).toBe(10);
  });
});
