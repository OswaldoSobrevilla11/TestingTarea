import { renderHook, act } from "@testing-library/react";
import useCounter from "../sharedComponent/useCounter"; 
describe("useCounter Hook", () => {
  test("should allow customization of the initial count", () => {
    const { result } = renderHook(() => useCounter({ initialCount: 10, step: 1 }));

    expect(result.current.count).toBe(10);

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(11);
  });

  test("should allow customization of the step", () => {
    const { result } = renderHook(() => useCounter({ initialCount: 0, step: 5 }));

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
