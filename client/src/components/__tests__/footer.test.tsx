import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Footer from "../footer";
import { advertiseId } from "../../global";

// Mock Logo, assuming they have been imported
vi.mock("../logo", () => ({ default: () => <div>Logo</div> }));

describe("Footer Component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders About section with correct contact information", () => {
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("info@jstemplate.net")).toBeInTheDocument();
    expect(screen.getByText("088 123 4567")).toBeInTheDocument();
  });

  it("renders Quick Link section with correct links", () => {
    const quickLinks = ["Home", "Blog", "Single Post", "Contact"];
    quickLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it("renders Category section with correct categories", () => {
    const categories = [
      "Lifestyle",
      "Technology",
      "Travel",
      "Business",
      "Economy",
      "Sports",
    ];
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it("renders Policies section with correct policies", () => {
    const policies = ["Terms of Use", "Privary Policy", "Cookie Policy"];
    policies.forEach((policy) => {
      expect(screen.getByText(policy)).toBeInTheDocument();
    });
  });

  it("should display the correct links for quick links", () => {
    const singlePostLink = screen.getByText("Single Post").closest("a");
    expect(singlePostLink).toHaveAttribute("href", `/blog/${advertiseId}`);

    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
