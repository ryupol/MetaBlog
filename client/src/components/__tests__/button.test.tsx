import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "../button";

describe("Button Component", () => {
  it("renders button with provided text", () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("applies primary styles by default", () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByRole("button", { name: /primary button/i });
    expect(button).toHaveClass("bg-primary text-white");
  });

  it("applies secondary styles when 'secondary' prop is true", () => {
    render(<Button secondary>Secondary Button</Button>);
    const button = screen.getByRole("button", { name: /secondary button/i });
    expect(button).toHaveClass("bg-theme-bg text-theme-maintext");
  });

  it("shows loading spinner and disables interaction when 'loading' is true", async () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole("button", { name: /loading button/i });

    // Check for loading state
    expect(button).toBeDisabled();
    expect(screen.getByTestId("spinner")).toHaveClass("animate-spin");

    // Check if the button text still shows up next to the spinner
    expect(screen.getByText(/loading button/i)).toBeInTheDocument();
  });

  it("is disabled when 'disabled' prop is passed", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    const button = screen.getByRole("button", { name: /clickable button/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
