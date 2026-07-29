import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders landing page by default", () => {
  render(<App />);
  expect(screen.getByText("Welcome to National Bank")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
});
