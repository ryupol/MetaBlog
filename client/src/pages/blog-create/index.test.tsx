import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BlogCreate from ".";
import TestWrapperProvider from "@/providers/test-wrapper-provider";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const renderBlogCreatePage = () => {
  return render(
    <MemoryRouter initialEntries={["/blog/create"]}>
      <Routes>
        <Route path={"/blog/create"} element={<BlogCreate />} />
      </Routes>
    </MemoryRouter>,
    { wrapper: TestWrapperProvider },
  );
};

describe("/blog/create Page", () => {
  it("should render correctly", async () => {
    renderBlogCreatePage();

    await waitFor(() => {
      const submitButton = screen.getByText(/Create Blog Post/i);
      expect(submitButton).toBeInTheDocument();
    });
  });
});
