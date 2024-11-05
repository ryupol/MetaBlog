import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Profile from "../profile";

describe("Profile component", () => {
  it("renders image with provided src", () => {
    const testSrc = "https://example.com/profile.jpg";
    render(<Profile src={testSrc} />);

    const img = screen.getByRole("img", { name: /profile/i });
    expect(img).toHaveAttribute("src", testSrc);
  });

  it("applies custom className", () => {
    const testClass = "test-class";
    const { container } = render(<Profile className={testClass} />);

    const profileDiv = container.firstChild;
    expect(profileDiv).toHaveClass(testClass);
  });

  it("renders without src and without crashing", () => {
    render(<Profile />);

    const img = screen.getByRole("img", { name: /profile/i });
    expect(img).toHaveAttribute("src", "");
  });
});
