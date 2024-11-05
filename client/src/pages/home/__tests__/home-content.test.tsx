import { render, screen } from "@testing-library/react";
import { describe, it, expect, Mock, vi } from "vitest";
import HomeContent from "../home-content";
import useFetchBlogs from "@/hooks/useFetchBlogs";

// Mock dependencies
vi.mock("@/hooks/useFetchBlogs");
vi.mock("@/components/error-popup", () => ({
  default: () => <div>ErrorPopup</div>,
}));
vi.mock("@/components/skeleton", () => ({
  HomeContentSkeleton: () => <div>Loading...</div>,
}));

const mockedUseFetchBlogs = useFetchBlogs as Mock;

describe("HomeContent Unit Tests", () => {
  const mockBlogs = [
    {
      blog_id: "123",
      title: "Test Blog",
      tag: "Technology",
      image_url: "image_url_1",
      profile_url: "profile_url_1",
      name: "Author One",
      updated_at: "2024-01-01",
    },
    {
      blog_id: "456",
      title: "Another Blog",
      tag: "Lifestyle",
      image_url: "image_url_2",
      profile_url: "profile_url_2",
      name: "Author Two",
      updated_at: "2024-01-02",
    },
  ];

  it("renders loading skeleton when loading", () => {
    mockedUseFetchBlogs.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
    render(<HomeContent queryValue="" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error popup when there is an error", () => {
    mockedUseFetchBlogs.mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: "Error fetching data" },
    });
    render(<HomeContent queryValue="" />);
    expect(screen.getByText("ErrorPopup")).toBeInTheDocument();
  });

  it("renders blog cards when data is available", async () => {
    mockedUseFetchBlogs.mockReturnValue({
      data: mockBlogs,
      isLoading: false,
      error: null,
    });

    render(<HomeContent queryValue="" />);

    const blogImages = screen.getAllByAltText("Card Image");
    const profileImages = screen.getAllByAltText("Profile");

    mockBlogs.forEach((mockData, index) => {
      expect(blogImages[index]).toHaveAttribute("src", mockData.image_url);

      const titleElement = screen.getByText(mockData.title);
      expect(titleElement).toBeInTheDocument();

      const tagElement = screen.getByText(mockData.tag);
      expect(tagElement).toBeInTheDocument();

      expect(profileImages[index]).toHaveAttribute("src", mockData.profile_url);

      const nameElement = screen.getByText(mockData.name);
      expect(nameElement).toBeInTheDocument();
    });
  });

  it("filters blogs by query value", () => {
    mockedUseFetchBlogs.mockReturnValue({
      data: mockBlogs,
      isLoading: false,
      error: null,
    });
    render(<HomeContent queryValue="another" />);
    expect(screen.queryByText("Test Blog")).not.toBeInTheDocument();
    expect(screen.getByText("Another Blog")).toBeInTheDocument();
  });

  it("displays 'No blog found' if filtered results are empty", () => {
    mockedUseFetchBlogs.mockReturnValue({
      data: mockBlogs,
      isLoading: false,
      error: null,
    });
    render(<HomeContent queryValue="nonexistent" />);
    expect(screen.getByText("No blog found")).toBeInTheDocument();
  });
});
