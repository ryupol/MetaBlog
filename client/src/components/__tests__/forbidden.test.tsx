import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Forbidden from "../forbidden";

vi.mock("../logo", () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

describe("Forbidden Component", () => {
  it("should render correctly", () => {
    render(<Forbidden />);

    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByText("403")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /access forbidden/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("You don't have permission to access this page."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /go to homepage/i }),
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /go to homepage/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
