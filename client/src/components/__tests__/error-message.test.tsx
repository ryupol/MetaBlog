import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ErrorMessage from "../error-message";

describe("ErrorMessage Component", () => {
  it("renders nothing when message is undefined", () => {
    const { container } = render(<ErrorMessage />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders error message with icon when message is provided", () => {
    const errorMessage = "This is an error message";
    render(<ErrorMessage message={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByTestId("exclamation-circle")).toBeInTheDocument();
  });
});
