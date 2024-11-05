import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BlogCard from "../blog-card";

const mockData = {
  tag: "Technology",
  title: "Learning React Testing",
  profile_url: "https://example.com/profile.png",
  name: "John Doe",
  updated_at: "2024-10-22T10:00:00Z",
  image_url: "https://example.com/blog-image.jpg",
};

describe("BlogCard Component", () => {
  it("renders the blog card correctly", () => {
    render(<BlogCard {...mockData} />);

    const blogImage = screen.getByAltText("Card Image");
    expect(blogImage).toHaveAttribute("src", mockData.image_url);

    const titleElement = screen.getByText(mockData.title);
    expect(titleElement).toBeInTheDocument();

    const tagElement = screen.getByText(mockData.tag);
    expect(tagElement).toBeInTheDocument();

    const profileImage = screen.getByAltText("Profile");
    expect(profileImage).toHaveAttribute("src", mockData.profile_url);

    const nameElement = screen.getByText(mockData.name);
    expect(nameElement).toBeInTheDocument();

    const dateElement = screen.getByText("October 22, 2024");
    expect(dateElement).toBeInTheDocument();
  });
});
