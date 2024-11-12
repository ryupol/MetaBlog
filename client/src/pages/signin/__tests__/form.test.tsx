import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import axios from "axios";
import SigninForm from "../form";

vi.mock("axios");

const mockedUseLocation = { state: { previousUrl: "/previous-path" } };
const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockedUseNavigate,
  useLocation: () => mockedUseLocation,
}));

describe("Signin Form", () => {
  it("should render correctly", async () => {
    render(<SigninForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByText(/signup/i)).toHaveAttribute("href", "/signup");
  });

  it("should return error Message", async () => {
    const mockFormData = {
      email: "hello@asdfghh.com",
      password: "123456",
    };
    (axios.post as Mock).mockRejectedValue(new Error("something wrong"));

    render(<SigninForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockFormData.email },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: mockFormData.password },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/Failed to sign in/i)).toBeInTheDocument();
    });
  });

  it("should submit form correctly", async () => {
    (axios.post as Mock).mockResolvedValue({ data: "login successful" });
    const mockFormData = {
      email: "hello@email.com",
      password: "123456",
    };

    render(<SigninForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockFormData.email },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: mockFormData.password },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/users/login", mockFormData);
      expect(mockedUseNavigate).toHaveBeenCalledWith("/previous-path", {
        replace: true,
      });
    });
  });
});
