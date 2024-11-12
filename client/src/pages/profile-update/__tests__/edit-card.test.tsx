import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import axios from "axios";
import useFetchMe from "@/hooks/useFetchMe";
import EditCard from "../edit-card";

vi.mock("@/hooks/useFetchMe");
vi.mock("axios");

const mockedUseLocation = { state: { previousUrl: "/previous-path" } };
const mockedUseNavigate = vi.fn();
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

describe("Edit Card Component", () => {
  const mockUser = {
    name: "mockName",
    email: "mock@gmail.com",
    profile_url: "mockProfile.png",
  };
  it("should render correctly", async () => {
    (useFetchMe as Mock).mockResolvedValue({
      data: mockUser,
      isLoading: false,
      isError: false,
    });

    render(<EditCard />);

    expect(screen.getByAltText("Profile")).toBeInTheDocument();
    expect(screen.getByLabelText(/change profile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("should submit the update form successful", async () => {
    (useFetchMe as Mock).mockResolvedValue({
      data: mockUser,
      isLoading: false,
      isError: false,
    });

    render(<EditCard />);

    const mockConfig = { headers: { "Content-Type": "multipart/form-data" } };
    const mockFormData = {
      name: "new name",
      email: "new@gmail.com",
      profile: new File(["new image content"], "new_profile.jpg", {
        type: "image/jpeg",
      }),
    };

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: mockFormData.name },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockFormData.email },
    });
    fireEvent.change(screen.getByTestId("profile-input"), {
      target: { files: [mockFormData.profile] },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        "/api/users/update",
        mockFormData,
        mockConfig,
      );
      expect(mockedUseNavigate).toHaveBeenCalledWith("/previous-path", {
        replace: true,
      });
    });
  });

  it("should fail to submit form", async () => {
    (axios.post as Mock).mockRejectedValue({});
    (useFetchMe as Mock).mockResolvedValue({
      data: mockUser,
      isLoading: false,
      isError: false,
    });

    render(<EditCard />);

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to update profile/i)).toBeInTheDocument();
    });
  });

  it("should navigate back to previous page ", () => {
    (useFetchMe as Mock).mockResolvedValue({
      data: mockUser,
      isLoading: false,
      isError: false,
    });

    render(<EditCard />);

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockedUseNavigate).toHaveBeenCalledWith(
      mockedUseLocation.state.previousUrl,
      { replace: true },
    );
  });
});
