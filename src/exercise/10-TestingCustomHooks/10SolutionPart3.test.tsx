import React from "react";
import { render, act } from "@testing-library/react";
import useCounter from "../sharedComponent/useCounter"; // Ajusta la ruta según tu estructura

// Función setup que abstrae la lógica común
function setup(props: { initialCount?: number; step?: number }) {
  const result = { current: {} as ReturnType<typeof useCounter> };

  function TestComponent() {
    result.current = useCounter(props);
    return null; // No renderiza UI visible
  }

  render(<TestComponent />);
  return result;
}

describe("useCounter Hook", () => {
  test("should allow customization of the initial count", () => {
    const result = setup({ initialCount: 10, step: 1 });

    expect(result.current.count).toBe(10); // Verifica el valor inicial

    // Llama a increment() dentro de act() para procesar correctamente la actualización de estado
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(11); // Verifica que incrementa correctamente
  });

  test("should allow customization of the step", () => {
    const result = setup({ initialCount: 0, step: 5 });

    // Llama a increment() dentro de act()
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(5); // Verifica que incrementa según el step

    // Llama a decrement() dentro de act()
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(0); // Verifica que decrementa correctamente
  });
});
