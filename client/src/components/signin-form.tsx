import Button from "./ui/button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function SigninForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const emailInput = useRef<HTMLInputElement>(null);
  const passInput = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", emailInput.current?.value || "");
    formData.set("password", passInput.current?.value || "");

    try {
      const response = await axios.post(
        "/api/users/login",
        Object.fromEntries(formData),
      );
      const message = response.data.message;
      if (message.toLowerCase().includes("success")) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // Safely access error.response.data.message
        setErrorMessage(error.response.data.message || "An error occurred");
      } else {
        setErrorMessage("Failed to sign in. Please try again.");
      }
    }
  };
  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl font-semibold">Login</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-theme-maintext"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="form-input py-2 pl-10 text-sm"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                ref={emailInput}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#696A75]" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="form-input py-2 pl-10 text-sm"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={3}
                ref={passInput}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-8 w-full bg-primary">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="mt-1 flex items-center space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-lightprimary underline hover:text-darkprimary"
          >
            Signup
          </a>
        </p>
      </div>
    </form>
  );
}

export default SigninForm;
