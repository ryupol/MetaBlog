import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BlogEditor from "../blog-editor";

const mockOnSubmit = vi.fn();

describe("BlogEditor Component", () => {
  it("should render form corrently", () => {
    render(<BlogEditor onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/blog title/i)).toBeInTheDocument();
    expect(screen.getByTestId(/blog-tag-wrapper/i)).toBeInTheDocument();
    expect(screen.getByTestId(/file-input/i)).toBeInTheDocument();
    expect(screen.getByTestId(/blog-editor-wrapper/i)).toBeInTheDocument();
  });

  it("should error to submit form", async () => {
    render(<BlogEditor onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    const errorMessage = screen.getByText(
      /please fill in all fields and select a valid tag./i,
    );
    await waitFor(() => expect(errorMessage).toBeInTheDocument());
  });

  it("should submit the form correctly", async () => {
    render(
      <BlogEditor onSubmit={mockOnSubmit} initialContent="Hello content" />,
    );
    fireEvent.change(screen.getByLabelText(/blog title/i), {
      target: { value: "hello title" },
    });
    fireEvent.click(screen.getByText(/select tag/i));
    fireEvent.click(screen.getByText(/lifestyle/i));
    fireEvent.change(screen.getByTestId("file-input"), {
      target: {
        files: [
          new File(["dummy image content"], "test.jpg", { type: "image/jpeg" }),
        ],
      },
    });
    // for content already initialize the value on prop

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });

  it("should initialize values in the form", async () => {
    render(
      <BlogEditor
        onSubmit={mockOnSubmit}
        initialTitle="mockTitle"
        initialTag="Technology"
        initialImage="mock-image.jpg"
        initialContent="mock Content"
        submitLabel="Update Blog"
      />,
    );
    // Title input
    const titleInput = screen.getByPlaceholderText(/type blog title/i);
    expect(titleInput).toHaveValue("mockTitle");
    // Dropdown
    expect(screen.getByText(/Technology/i)).toBeInTheDocument();
    // File input
    const imgElement = screen.getByAltText(/blog image/i);
    expect(imgElement).toBeInTheDocument();
    // Content
    expect(screen.getByText(/mock Content/i)).toBeInTheDocument();
    // Submit Button
    const submitButton = screen.getByRole("button", { name: /update blog/i });
    expect(submitButton).toBeInTheDocument();
  });
});
