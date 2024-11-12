import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { useSelector } from "react-redux";
import Logo from "../logo";

vi.mock("react-redux");

describe("Logo Component", () => {
  it("renders with light theme", () => {
    (useSelector as unknown as Mock).mockReturnValue({ theme: "light" });

    render(<Logo />);
    expect(screen.queryByAltText("black-logo")).toBeInTheDocument();
    expect(screen.queryByText("JS Template")).toBeNull();
  });

  it("renders with dark theme", () => {
    (useSelector as unknown as Mock).mockReturnValue({ theme: "dark" });

    render(<Logo />);
    expect(screen.queryByAltText("white-logo")).toBeInTheDocument();
    expect(screen.queryByText("JS Template")).toBeNull();
  });

  it("renders footer version with light theme", () => {
    (useSelector as unknown as Mock).mockReturnValue({ theme: "light" });

    render(<Logo footer={true} />);

    expect(screen.queryByAltText("black-logo")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveClass("text-xl");
    expect(screen.queryByText("JS Template")).toBeInTheDocument();
  });

  it("renders footer version with dark theme", () => {
    (useSelector as unknown as Mock).mockReturnValue({ theme: "dark" });

    render(<Logo footer={true} />);

    expect(screen.queryByAltText("white-logo")).toBeInTheDocument();
    expect(screen.queryByText("JS Template")).toBeInTheDocument();
  });

  it("renders dark theme if signForm is true and theme is light", () => {
    (useSelector as unknown as Mock).mockReturnValue({ theme: "light" });

    render(<Logo signForm={true} />);

    expect(screen.queryByAltText("white-logo")).toBeInTheDocument();
  });
});
