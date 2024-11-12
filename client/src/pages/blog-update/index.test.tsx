import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BlogUpdate from ".";
import TestWrapperProvider from "@/providers/test-wrapper-provider";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const renderBlogUpdatePage = () => {
  return render(
    <MemoryRouter initialEntries={["/blog/update/1"]}>
      <Routes>
        <Route path={"/blog/update/:id"} element={<BlogUpdate />} />
      </Routes>
    </MemoryRouter>,
    { wrapper: TestWrapperProvider },
  );
};

describe("/blog/update/:id Page", () => {
  it("should render correctly", async () => {
    renderBlogUpdatePage();

    await waitFor(() => {
      const submitButton = screen.getByText(/Update Blog Post/i);
      expect(submitButton).toBeInTheDocument();
    });
  });
});
