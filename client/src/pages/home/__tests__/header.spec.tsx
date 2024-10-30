import { render, screen } from "@testing-library/react";
import Header from "../header";
import useFetchBlogById from "@/hooks/useFetchBlogById";
import { advertiseId } from "@/global";

jest.mock("@/hooks/useFetchBlogById");

describe("Header Component", () => {
  const mockData = {
    image_url: "https://example.com/image.jpg",
    blog_id: advertiseId,
    tag: "Technology",
    title: "Learning React Testing",
    profile_url: "https://example.com/profile.jpg",
    name: "John Doe",
    updated_at: "2024-10-22T12:34:56Z",
  };

  test("renders HeaderSkeleton when loading", () => {
    // Mock the hook to return loading state
    (useFetchBlogById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    // Render the Header component
    render(<Header queryValue="" />);

    // Assert that HeaderSkeleton is displayed
    expect(screen.getByTestId("header-skeleton")).toBeInTheDocument();
  });

  test("renders nothing when queryValue is provided or there is an error", () => {
    // Mock the hook to return error state
    (useFetchBlogById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    // Render the Header component with queryValue
    const { container } = render(<Header queryValue="search" />);

    // Assert that nothing is rendered
    expect(container.firstChild).toBeNull();
  });

  test("renders the blog data when loaded", () => {
    // Mock the hook to return success state
    (useFetchBlogById as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    // Render the Header component
    render(<Header queryValue="" />);

    const blogImage = screen.getByAltText("Header Blog image");
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
