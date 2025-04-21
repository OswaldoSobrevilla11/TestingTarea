import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UseCounterHook from "../sharedComponent/UseCounterHook"; 

describe("UseCounterHook Component", () => {
  test("renders with the initial count set to 0", () => {
    render(<UseCounterHook />);

    const counterDisplay = screen.getByTestId("counter");
    expect(counterDisplay).toHaveTextContent("Counter: 0");
  });

  test("increments the counter by 1", async () => {
    render(<UseCounterHook />);

    const incrementButton = screen.getByText(/Increment/i);
    const counterDisplay = screen.getByTestId("counter");

    await userEvent.click(incrementButton); 
    expect(counterDisplay).toHaveTextContent("Counter: 1");
  });

  test("decrements the counter by 1", async () => {
    render(<UseCounterHook />);

    const decrementButton = screen.getByText(/Decrement/i);
    const counterDisplay = screen.getByTestId("counter");

    await userEvent.click(decrementButton); 
    expect(counterDisplay).toHaveTextContent("Counter: -1");
  });

  test("increments and decrements the counter multiple times", async () => {
    render(<UseCounterHook />);

    const incrementButton = screen.getByText(/Increment/i);
    const decrementButton = screen.getByText(/Decrement/i);
    const counterDisplay = screen.getByTestId("counter");

    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    expect(counterDisplay).toHaveTextContent("Counter: 2");

    await userEvent.click(decrementButton);
    expect(counterDisplay).toHaveTextContent("Counter: 1");
  });
});
