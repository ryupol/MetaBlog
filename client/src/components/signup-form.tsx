import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Button from "./ui/button";

function SignupForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const emailInput = useRef<HTMLInputElement>(null);
  const passInput = useRef<HTMLInputElement>(null);
  const passConInput = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", emailInput.current?.value || "");
    formData.set("password", passInput.current?.value || "");
    formData.set("passwordConfirm", passConInput.current?.value || "");

    try {
      await axios.post("/api/users/register", Object.fromEntries(formData));
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // Safely access error.response.data.message
        setErrorMessage(error.response.data.message || "An error occurred");
      } else {
        setErrorMessage("Failed to sign up. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl font-semibold">Signup</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium"
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
                maxLength={16}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#696A75]" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="password"
            >
              Create Password
            </label>
            <div className="relative">
              <input
                className="form-input py-2 pl-10 text-sm"
                id="create-password"
                type="password"
                name="create-password"
                placeholder="Enter password"
                required
                minLength={6}
                ref={passInput}
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#696A75]" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-theme-maintext"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="form-input py-2 pl-10 text-sm"
                id="confirm-password"
                type="password"
                name="confirm-password"
                placeholder="Enter confirm password"
                required
                minLength={6}
                ref={passConInput}
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#696A75]" />
            </div>
          </div>
        </div>
        <Button className="mt-8 w-full bg-primary">
          Signup <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        {errorMessage && (
          <div
            className="flex h-8 items-end space-x-1 text-sm text-red-500"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5" />
            <p>{errorMessage}</p>
          </div>
        )}
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-lightprimary underline hover:text-darkprimary"
          >
            Login
          </a>
        </p>
      </div>
    </form>
  );
}

export default SignupForm;
