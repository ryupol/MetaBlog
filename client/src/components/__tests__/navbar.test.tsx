import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import useFetchMe from "@/hooks/useFetchMe";
import { toggleTheme } from "@/redux/theme/themeSlice";
import axios from "axios";
import Navbar from "../navbar";
import { MemoryRouter } from "react-router-dom";

vi.mock("../logo", () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock("axios");
vi.mock("react-redux");
vi.mock("../../hooks/useFetchMe");
vi.mock("../../hooks/useClickOutside");
vi.mock("../../hooks/useHandleSearch");

const mockedUseNavigate = vi.fn();
const mockedUseLocation = { pathname: "/current-path" };
vi.mock("react-router-dom", async () => {
  const mod =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
    useLocation: () => mockedUseLocation,
  };
});
const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );

describe("Navbar Component", () => {
  describe("when User Logout", () => {
    beforeEach(() => {
      (useSelector as unknown as Mock).mockReturnValue({ theme: "light" });
      (useFetchMe as Mock).mockReturnValue({ data: null, isLoading: false });
    });

    it("should render element correctly", () => {
      (useFetchMe as Mock).mockResolvedValue({ data: null, isLoading: false });

      renderNavbar();

      expect(screen.getByTestId("logo")).toBeInTheDocument();
      // Link
      expect(screen.getByText(/home/i)).toBeInTheDocument();
      expect(screen.getByText(/blog/i)).toBeInTheDocument();
      expect(screen.getByText(/single post/i)).toBeInTheDocument();
      expect(screen.getByText(/contract/i)).toBeInTheDocument();
      // Search Input
      expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
      // Login Button
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should navigate to login page", () => {
      renderNavbar();

      // Test navigation to "signin"
      const loginButton = screen.getByRole("button", { name: /login/i });
      fireEvent.click(loginButton);
      expect(mockedUseNavigate).toHaveBeenCalledWith("/signin", {
        state: { previousUrl: mockedUseLocation.pathname },
      });
    });
  });

  describe("when User Login", () => {
    beforeEach(() => {
      (useSelector as unknown as Mock).mockReturnValue({ theme: "light" });
      (useFetchMe as Mock).mockReturnValue({
        data: {
          profile_url: "/profile.jpg",
          name: "John Doe",
          email: "john@example.com",
        },
        isLoading: false,
      });
    });

    it("should render UserMenu correctly", () => {
      renderNavbar();

      const userProfile = screen.getByTestId("user-profile");
      fireEvent.click(userProfile);
      expect(screen.getByText(/john doe/i)).toBeInTheDocument();
      expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
      const [userProfile1, userProfile2] = screen.getAllByAltText(/profile/i);
      expect(userProfile1).toBeInTheDocument();
      expect(userProfile2).toBeInTheDocument();
    });

    it("should change theme correctly", () => {
      const mockDispatch = vi.fn();
      (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);

      renderNavbar();

      const themeSwitch = screen.getByText(/appearance/i);
      fireEvent.click(themeSwitch);
      expect(mockDispatch).toBeCalledWith(toggleTheme());
    });

    it("should logout correctly", () => {
      const reloadMock = vi.fn();
      Object.defineProperty(window, "location", {
        value: {
          ...window.location,
          reload: reloadMock,
        },
        writable: true,
      });

      renderNavbar();

      const logoutButton = screen.getByTestId("logout-button");
      fireEvent.click(logoutButton);

      expect(reloadMock).toHaveBeenCalledTimes(1);
      expect(axios.post).toBeCalledWith("/api/users/logout");
      reloadMock.mockRestore();
    });
  });

  it("should navigate correctly", () => {
    renderNavbar();

    // Test navigation to "Create Blog"
    const createBlogButton = screen.getByText(/create blog/i);
    fireEvent.click(createBlogButton);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/blog/create");

    // Test navigation to "Edit Profile"
    const editProfileButton = screen.getByText(/edit profile/i);
    fireEvent.click(editProfileButton);

    // Verify that the correct state is passed to navigate
    expect(mockedUseNavigate).toHaveBeenCalledWith("/edit/profile", {
      state: { previousUrl: "/current-path" },
    });
  });
});
