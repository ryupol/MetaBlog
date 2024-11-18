import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import Home from "..";
import TestWrapperProvider from "@/providers/test-wrapper-provider";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import useQueryValue from "@/hooks/useQueryValue";

vi.mock("@/hooks/useQueryValue");

const renderHomePage = () => {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path={"/"} element={<Home />} />
      </Routes>
    </MemoryRouter>,
    { wrapper: TestWrapperProvider },
  );
};

describe("Home Page", () => {
  it("should render correctly", () => {
    (useQueryValue as Mock).mockReturnValue("");
    renderHomePage();

    const title = screen.getByText(/latest post/i);
    expect(title).toBeInTheDocument();
  });

  it("should change title when search", () => {
    (useQueryValue as Mock).mockReturnValue("mock title");
    renderHomePage();

    const title = screen.getByText(/search result/i);
    expect(title).toBeInTheDocument();
  });
});
