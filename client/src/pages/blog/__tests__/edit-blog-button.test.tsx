import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EditBlogButton from "../edit-blog-button";

const mockBlogId = 1;

vi.mock("react-router-dom", () => ({
  useParams: () => ({ id: mockBlogId }),
}));

describe("EditBlogButton", () => {
  it("renders the edit button with the correct link", () => {
    render(<EditBlogButton />);

    // Check if the link is rendered correctly with the id in the href
    const editButton = screen.getByTestId("edit-button");
    expect(editButton).toHaveAttribute("href", `/edit/blog/${mockBlogId}`);
  });
});
