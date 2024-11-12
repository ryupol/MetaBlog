import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Blog from "..";
import TestWrapperProvider from "@/providers/test-wrapper-provider";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";

const renderBlogPage = (id: number) => {
  return render(
    <MemoryRouter initialEntries={[`/blog/${id}`]}>
      <Routes>
        <Route path={"/blog/:id"} element={<Blog />} />
      </Routes>
    </MemoryRouter>,
    { wrapper: TestWrapperProvider },
  );
};

describe("/blog/:id Page", () => {
  it("should render blog correctly", async () => {
    renderBlogPage(3);

    // Check if loading skeleton is visible initially
    const skeleton = screen.getByTestId("blog-content-skeleton");
    expect(skeleton).toBeInTheDocument();

    // Wait for the blog content to be rendered
    await waitFor(() => {
      // Check that the image and profile pictures are correctly rendered
      const blogImage = screen.getByAltText("Blog Image");
      expect(blogImage).toBeInTheDocument();
      expect(blogImage).toHaveAttribute("src", "https://example.com/mock3.png");

      const profileImage = screen.getAllByAltText("Profile")[0];
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute(
        "src",
        "https://example.com/mock_user1.png",
      );

      // Check that the title, content, username, and date are displayed correctly
      expect(screen.getByText(/mock title 3/i)).toBeInTheDocument();
      expect(screen.getByText(/mock content for blog 3/i)).toBeInTheDocument();
      expect(screen.getByText(/mock user 3/i)).toBeInTheDocument();
      expect(screen.getByText("March 15, 2024")).toBeInTheDocument();

      // Ensure there is no <p> tag in the content (assuming this is for raw HTML verification)
      const htmlTag = screen.queryByText(/<p>/i);
      expect(htmlTag).not.toBeInTheDocument();

      // Ensure edit and delete options are not visible for non-owners
      const editDelWrapper = screen.queryByTestId("edit-del-wrapper");
      expect(editDelWrapper).not.toBeInTheDocument();

      // Check that the blog tag is correctly rendered
      const tagElement = screen.getByTestId("tag");
      expect(tagElement).toHaveTextContent("Business");
    });
  });

  it("should show edit and delete button if the owner visit owner blog", async () => {
    renderBlogPage(1); // in mock data owner user_id = 1

    await waitFor(() => {
      const editButton = screen.queryByTestId("edit-button");
      expect(editButton).toBeInTheDocument();

      const deleteButton = screen.queryByTestId("delete-button");
      expect(deleteButton).toBeInTheDocument();
    });
  });

  it("should show error popup if there is an error", async () => {
    server.use(
      http.get("/api/blogs/:id", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );
    renderBlogPage(3);

    await waitFor(() => {
      const error = screen.getByText(/there was an error/i);
      expect(error).toBeInTheDocument();
    });
  });
});
