import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import axios from "axios";
import SignupForm from "../form";

vi.mock("axios");

const mockedUseLocation = { state: { previousUrl: "/" } };
const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockedUseNavigate,
  useLocation: () => mockedUseLocation,
}));

describe("Signup Form", () => {
  it("should render correctly", async () => {
    render(<SignupForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/create password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /signup/i })).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toHaveAttribute("href", "/signin");
  });

  it("should return error Message", async () => {
    const mockFormData = {
      email: "hello@asdfghh.com",
      password: "123456",
      passwordConfirm: "654321",
    };
    (axios.post as Mock).mockRejectedValue(new Error("something wrong"));

    render(<SignupForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockFormData.email },
    });
    fireEvent.change(screen.getByLabelText(/create password/i), {
      target: { value: mockFormData.password },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: mockFormData.passwordConfirm },
    });
    fireEvent.click(screen.getByRole("button", { name: /signup/i }));

    await waitFor(() => {
      expect(screen.getByText(/Failed to sign up/i)).toBeInTheDocument();
    });
  });

  it("should submit form correctly", async () => {
    (axios.post as Mock).mockResolvedValue({ data: "login successful" });
    const mockFormData = {
      email: "hello@email.com",
      password: "123456",
      passwordConfirm: "123456",
    };

    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockFormData.email },
    });
    fireEvent.change(screen.getByLabelText(/create password/i), {
      target: { value: mockFormData.password },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: mockFormData.passwordConfirm },
    });
    fireEvent.click(screen.getByRole("button", { name: /signup/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "/api/users/register",
        mockFormData,
      );
      expect(mockedUseNavigate).toHaveBeenCalledWith("/", {
        replace: true,
      });
    });
  });
});
