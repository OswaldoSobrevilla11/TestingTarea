import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { build } from "@jackfranklin/test-data-bot";
import Login from "../sharedComponent/Login";
import { faker } from "@faker-js/faker";

const buildLoginForm = build<{
  username: string;
  password: string;
}>({
  fields: {
    username: () => faker.internet.userName().replace(/[^a-zA-Z0-9]/g, ""),
    password: () => faker.internet.password().replace(/[^a-zA-Z0-9]/g, ""),
  },
});

describe("Login Component with dynamic data", () => {
  test("submits form with dynamically generated data", async () => {
    const onSubmitMock = jest.fn();
    render(<Login onSubmit={onSubmitMock} />);

    const { username, password } = buildLoginForm();

    const usernameInput = screen.getByLabelText(/username:/i);
    const passwordInput = screen.getByLabelText(/password:/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    const user = userEvent.setup();
    await user.type(usernameInput, username);
    await user.type(passwordInput, password);
    await user.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({ username, password });
  });
});