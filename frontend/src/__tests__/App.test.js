import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

describe("App component", () => {
  test("renders login and register buttons if not logged in", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const loginButton = screen.getByText("Login");
    const registerButton = screen.getByText("Register");

    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
});
