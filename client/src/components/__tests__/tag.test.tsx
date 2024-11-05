import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Tag from "../tag";

describe("Tag component", () => {
  it("renders with correct default style for known category without header", () => {
    render(<Tag cat="Lifestyle" />);

    const tag = screen.getByText(/lifestyle/i);
    expect(tag).toHaveClass("bg-[#026AA2] bg-opacity-5 text-[#026AA2]");
  });

  it("renders with correct header style for known category", () => {
    render(<Tag cat="Technology" header />);

    const tag = screen.getByText(/technology/i);
    expect(tag).toHaveClass("bg-primary text-white");
  });

  it("renders with default style for undefine category without header", () => {
    render(<Tag />);

    const tag = screen.getByText(/unknown/i);
    expect(tag).toHaveClass(
      "bg-theme-skeleton bg-opacity-5 text-theme-skeleton",
    );
  });

  it("renders with default style for unknown category", () => {
    render(<Tag cat={"unknown category"} />);

    const tag = screen.getByText(/unknown/i);
    expect(tag).toHaveClass(
      "bg-theme-skeleton bg-opacity-5 text-theme-skeleton",
    );
  });
});
