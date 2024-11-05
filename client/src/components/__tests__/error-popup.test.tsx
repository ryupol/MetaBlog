import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import ErrorPopup from "../error-popup";

describe("ErrorPopup Component", () => {
  it("renders with default message", () => {
    render(<ErrorPopup />);

    expect(screen.getByTestId("exclamation-triangle")).toBeInTheDocument();
    expect(
      screen.getByText("There was an error: An unknown error occurred."),
    ).toBeInTheDocument();
  });

  it("renders with custom error message", () => {
    const customMessage = "A specific error occurred.";
    render(<ErrorPopup message={customMessage} />);

    expect(
      screen.getByText(`There was an error: ${customMessage}`),
    ).toBeInTheDocument();
  });

  it("displays icon, heading, and refresh link", () => {
    render(<ErrorPopup message="Test error message" />);

    expect(screen.getByTestId("exclamation-triangle")).toBeInTheDocument();
    expect(screen.getByText("Oops! Something Went Wrong")).toBeInTheDocument();

    // Check for the link with correct href and styling
    const refreshLink = screen.getByRole("link", { name: /refresh the page/i });
    expect(refreshLink).toBeInTheDocument();
    expect(refreshLink).toHaveAttribute("href", "/");
  });
});
