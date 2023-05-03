import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import React from "react";

test("Login button is displayed when no user is logged in", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const loginButton = screen.getByRole("button", { name: "Login" });
  expect(loginButton).toBeInTheDocument();
});

test("NewsAggregator component is displayed when Chat tab is selected", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const chatTab = screen.getByRole("tab", { name: "Chat" });
  userEvent.click(chatTab);
  const newsAggregator = screen.getByRole("region", { name: "News Aggregator" });
  expect(newsAggregator).toBeInTheDocument();
});

test("Instructions component is displayed when Instructions tab is selected", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const instructionsTab = screen.getByRole("tab", { name: "Instructions" });
  userEvent.click(instructionsTab);
  const instructions = screen.getByRole("region", { name: "Instructions" });
  expect(instructions).toBeInTheDocument();
});

test("Register button is displayed when no user is logged in", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const registerButton = screen.getByRole("button", { name: "Register" });
  expect(registerButton).toBeInTheDocument();
});
