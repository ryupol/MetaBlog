import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TestWrapperProvider from "@/providers/test-wrapper-provider";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProfileUpdate from "..";
import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";

const renderProfileUpdatePage = () => {
  return render(
    <MemoryRouter initialEntries={["/profile/update"]}>
      <Routes>
        <Route path={"/profile/update"} element={<ProfileUpdate />} />
      </Routes>
    </MemoryRouter>,
    { wrapper: TestWrapperProvider },
  );
};

describe("/profile/update Page", () => {
  it("should render correctly", () => {
    renderProfileUpdatePage();

    expect(screen.getByTestId("profile-update")).toBeInTheDocument();
  });

  it("should loading and finish loading editcard component", async () => {
    renderProfileUpdatePage();

    expect(screen.getByTestId("edit-card-skeleton")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("edit-card-form")).toBeInTheDocument();
    });
    expect(screen.queryByTestId("edit-card-skeleton")).not.toBeInTheDocument();
  });

  it("should show forbidden page if user is not login", async () => {
    server.use(
      http.get("/api/users/me", () => {
        return new HttpResponse(null, { status: 404 });
      }),
    );
    renderProfileUpdatePage();

    await waitFor(() => {
      const error = screen.getByText(/Access Forbidden/i);
      expect(error).toBeInTheDocument();
    });
  });
});
