import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("renders Login and Register buttons", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const loginButton = screen.getByText(/Login/i);
  expect(loginButton).toBeInTheDocument();

  const registerButton = screen.getByText(/Register/i);
  expect(registerButton).toBeInTheDocument();
});

test("navigates to Login page", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const loginButton = screen.getByText(/Login/i);
  userEvent.click(loginButton);

  const loginForm = screen.getByText(/Sign in to your account/i);
  expect(loginForm).toBeInTheDocument();
});

test("navigates to Register page", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const registerButton = screen.getByText(/Register/i);
  userEvent.click(registerButton);

  const registerForm = screen.getByText(/Create a new account/i);
  expect(registerForm).toBeInTheDocument();
});
