import Button from "./ui/button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";

function SigninForm() {
  return (
    <form action="" className="space-y-3">
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
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-8 w-full bg-primary">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )} */}
        </div>
        <p className="text-sm">
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
