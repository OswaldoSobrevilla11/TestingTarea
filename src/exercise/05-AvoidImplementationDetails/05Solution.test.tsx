import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; 
import "@testing-library/jest-dom";
import Counter from "../sharedComponent/Counter";

describe("Counter component behavior using userEvent", () => {
  test("displays initial counter value and updates on button clicks", async () => {
    render(<Counter />);

    const incrementButton = screen.getByRole("button", { name: /increment/i });
    const decrementButton = screen.getByRole("button", { name: /decrement/i });
    const message = screen.getByText(/counter:/i);

    const user = userEvent.setup();

    expect(message).toHaveTextContent("Counter: 0");

    await user.click(incrementButton); 
    expect(message).toHaveTextContent("Counter: 1");

    await user.click(decrementButton); 
    expect(message).toHaveTextContent("Counter: 0");
  });
});