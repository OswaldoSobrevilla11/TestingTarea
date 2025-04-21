import React from "react";
import { render, act } from "@testing-library/react";
import useCounter from "../sharedComponent/useCounter"; // Ajusta la ruta según tu estructura

let result: ReturnType<typeof useCounter>; // Almacena el resultado del hook

// Componente de prueba
function TestComponent({ initialCount, step }: { initialCount: number; step: number }) {
  result = useCounter({ initialCount, step });
  return null; // El componente no tiene UI visible
}

describe("useCounter Hook", () => {
  test("initializes with the correct count", () => {
    render(<TestComponent initialCount={5} step={1} />);

    expect(result.count).toBe(5); // Verifica que el contador comience con el valor inicial
  });

  test("increments the count correctly", () => {
    render(<TestComponent initialCount={0} step={2} />);

    act(() => {
      result.increment(); // Incrementa el contador en 2 dentro de act()
    });
    expect(result.count).toBe(2);
  });

  test("decrements the count correctly", () => {
    render(<TestComponent initialCount={5} step={2} />);

    act(() => {
      result.decrement(); // Decrementa el contador en 2 dentro de act()
    });
    expect(result.count).toBe(3);
  });

  test("works with custom step values", () => {
    render(<TestComponent initialCount={10} step={5} />);

    act(() => {
      result.increment(); // Incrementa en el valor del step
    });
    expect(result.count).toBe(15);

    act(() => {
      result.decrement(); // Decrementa en el valor del step
    });
    expect(result.count).toBe(10);
  });
});
