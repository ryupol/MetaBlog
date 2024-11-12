import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteBlogButton from "../delete-blog-button";

const mockBlogId = 1;

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  useParams: () => ({ id: mockBlogId }), // mock BlogId
}));
vi.mock("@/components/error-message", () => ({
  default: ({ message }: { message: string }) => <div>{message}</div>,
}));
vi.mock("axios");

describe("DeleteBlogButton", () => {
  it("should opens the popup when the delete button is clicked", () => {
    render(<DeleteBlogButton />);

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("should closes the popup when the cancel button is clicked", () => {
    render(<DeleteBlogButton />);

    fireEvent.click(screen.getByTestId("delete-button"));

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    // Check if the popup is closed
    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
  });

  it('should calls the delete API and navigates when "Yes, delete it!" is clicked', async () => {
    const mockPost = vi.fn().mockResolvedValueOnce({}); // Mock successful API response
    axios.post = mockPost;

    const navigate = vi.fn();
    (useNavigate as Mock).mockImplementation(() => navigate);

    render(<DeleteBlogButton />);

    fireEvent.click(screen.getByTestId("delete-button"));

    const confirmButton = screen.getByText("Yes, delete it!");
    fireEvent.click(confirmButton);

    await waitFor(() =>
      expect(mockPost).toHaveBeenCalledWith(`/api/blogs/delete/${mockBlogId}`),
    );
    expect(navigate).toHaveBeenCalledWith("/", { replace: true });
  });

  it("should handles generic error correctly", async () => {
    (axios.post as Mock).mockRejectedValueOnce(new Error("Unkown error"));

    render(<DeleteBlogButton />);

    fireEvent.click(screen.getByTestId("delete-button"));

    const confirmButton = screen.getByText(/Yes, delete it!/i);
    fireEvent.click(confirmButton);

    await waitFor(() =>
      expect(screen.getByText(/unexpected error/i)).toBeInTheDocument(),
    );
  });
});
