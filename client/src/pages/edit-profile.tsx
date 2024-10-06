import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { CameraIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import Button from "../components/ui/button";
import handleFileChange from "../hooks/handleFileChange";
import { EditCardSkeleton } from "../components/ui/skeleton";
import { UserTokenProps } from "../types/user.type";

function EditProfile() {
  return (
    <main className="theme-base flex min-h-screen w-full items-center justify-center">
      <EditCard />
    </main>
  );
}

function EditCard() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const profileInput = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [profilePreview, setProfilePreview] = useState<string>("");

  const previousUrl: string = location.state.previousUrl
    ? location.state.previousUrl
    : "/";

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();

    navigate(previousUrl, { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const defaultProfile =
      "https://res.cloudinary.com/dxwmjflhh/image/upload/happy.jpg";

    const formData = new FormData();
    formData.set("name", nameInput.current?.value || "");
    formData.set("email", emailInput.current?.value || "");
    formData.set(
      "profile",
      profileInput?.current?.files?.[0] || defaultProfile,
    );

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const objectformData = Object.fromEntries(formData);

      await axios.post("/api/users/update", objectformData, config);
      // const message = response.data.message;
      navigate(previousUrl, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // Safely access error.response.data.message
        setErrorMessage(error.response.data.message || "An error occurred");
      } else {
        setErrorMessage("Failed to sign in. Please try again.");
      }
    }
  };

  const fetchMe = async () => {
    const response = await axios.get("/api/users/me");
    setProfilePreview(response.data.profile_url);
    return response.data;
  };

  const { data, isLoading } = useQuery<UserTokenProps>("getMe", () =>
    fetchMe(),
  );

  if (isLoading) return <EditCardSkeleton />;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[40%] max-w-[600px] rounded-xl border border-theme-skeleton bg-theme-fbg p-10 text-theme-maintext"
    >
      <div className="flex items-center justify-between">
        <h1>Edit Profile</h1>
        <label
          htmlFor="profile-input"
          className="group relative h-16 w-16 flex-shrink-0 cursor-pointer rounded-full"
        >
          <img
            src={profilePreview}
            alt="Profile"
            className="h-[100%] w-[100%] rounded-full object-cover"
          />
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 justify-center rounded-full bg-black p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-40">
            <CameraIcon className="w-[80%]" stroke="white" />
          </div>
          <p className="pointer-events-none absolute bottom-[-1] left-1/2 z-10 mt-4 -translate-x-1/2 text-nowrap rounded-md bg-black p-2 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-50">
            Change Profile
          </p>
          <input
            id="profile-input"
            type="file"
            className="hidden"
            ref={profileInput}
            onChange={(e) => {
              handleFileChange(e, {
                onFileLoad: (result) => setProfilePreview(result as string),
              });
            }}
          />
        </label>
      </div>
      <p className="mt-4 font-semibold">Name</p>
      <input
        className="form-input px-4 py-2"
        type="text"
        maxLength={16}
        placeholder={data?.name}
        ref={nameInput}
      />
      <p className="mt-4 font-semibold">Email</p>
      <input
        className="form-input px-4 py-2"
        type="email"
        placeholder={data?.email}
        ref={emailInput}
        maxLength={16}
      />
      <div className="mt-8 flex gap-4">
        <Button secondary={true} onClick={handleCancel}>
          Cancel
        </Button>
        <Button>Save</Button>
      </div>
      {errorMessage && (
        <div className="mt-2 flex gap-1">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}

export default EditProfile;
