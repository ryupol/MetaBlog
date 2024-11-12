import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, Mock } from "vitest";
import { useSelector } from "react-redux";
import ThemeProvider from "../theme-provider";

vi.mock("react-redux");

describe("ThemeProvider Component", () => {
  const mockUseSelector = useSelector as unknown as Mock;

  it("should apply light theme class when theme is 'light'", () => {
    mockUseSelector.mockReturnValue({ theme: "light" });

    render(
      <ThemeProvider>
        <div data-testid="child-element">Test Child</div>
      </ThemeProvider>,
    );

    const themeProvider = screen.getByTestId("child-element").parentElement;
    expect(themeProvider).toHaveClass("light");
  });

  it("should apply dark theme class when theme is 'dark'", () => {
    mockUseSelector.mockReturnValue({ theme: "dark" });

    render(
      <ThemeProvider>
        <div data-testid="child-element">Test Child</div>
      </ThemeProvider>,
    );

    const themeProvider = screen.getByTestId("child-element").parentElement;
    expect(themeProvider).toHaveClass("dark");
  });
});
