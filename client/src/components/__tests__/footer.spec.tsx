import { render, screen } from "@testing-library/react";
import Footer from "../footer";
import { advertiseId } from "@/global";

// Mock Logo, assuming they have been imported
jest.mock("../logo", () => () => <div>Logo</div>);

describe("Footer Component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test("renders About section with correct contact information", () => {
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("info@jstemplate.net")).toBeInTheDocument();
    expect(screen.getByText("088 123 4567")).toBeInTheDocument();
  });

  test("renders Quick Link section with correct links", () => {
    const quickLinks = ["Home", "Blog", "Single Post", "Contact"];
    quickLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test("renders Category section with correct categories", () => {
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

  test("renders Policies section with correct policies", () => {
    const policies = ["Terms of Use", "Privary Policy", "Cookie Policy"];
    policies.forEach((policy) => {
      expect(screen.getByText(policy)).toBeInTheDocument();
    });
  });

  test("should display the correct links for quick links", () => {
    const singlePostLink = screen.getByText("Single Post").closest("a");
    expect(singlePostLink).toHaveAttribute("href", `/blog/${advertiseId}`);

    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
