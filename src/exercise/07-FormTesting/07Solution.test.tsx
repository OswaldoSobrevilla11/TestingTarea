import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "../sharedComponent/Login";

describe("Login Component", () => {
  test("submits form with username and password", async () => {
    const onSubmitMock = jest.fn();
    render(<Login onSubmit={onSubmitMock} />);

    const usernameInput = screen.getByLabelText(/username:/i);
    const passwordInput = screen.getByLabelText(/password:/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    const user = userEvent.setup();
    await user.type(usernameInput, "testuser");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({
      username: "testuser",
      password: "password123",
    });
  });
});
