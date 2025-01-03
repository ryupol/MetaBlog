import { useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import handleImageChange from "../../hooks/handleImageChange";
import useFetchMe from "../../hooks/useFetchMe";

import Forbidden from "../../components/forbidden";
import Button from "../../components/button";
import ErrorMessage from "../../components/error-message";
import { EditCardSkeleton } from "../../components/skeleton";

function EditCard() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const profileInput = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [imgPreview, setImgPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // for loading while submitting

  const previousUrl: string = location.state?.previousUrl || "/";

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();

    navigate(previousUrl, { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const defaultProfile =
      "https://res.cloudinary.com/dxwmjflhh/image/upload/v1727805743/happy.jpg";

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
      console.log(objectformData);
      await axios.post("/api/users/update", objectformData, config);
      navigate(previousUrl, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // Safely access error.response.data.message
        setErrorMessage(error.response.data.message || "An error occurred");
      } else {
        setErrorMessage("Failed to update profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const { data, isLoading, isError } = useFetchMe();

  if (isLoading) return <EditCardSkeleton />;

  if (isError) return <Forbidden />;

  return (
    <form
      data-testid="edit-card-form"
      onSubmit={handleSubmit}
      className="w-[40%] max-w-[600px] rounded-xl border border-theme-skeleton bg-theme-fbg p-10 text-theme-maintext"
    >
      <div className="flex items-center justify-between">
        <h1>Edit Profile</h1>
        <label
          data-cy="profile-input"
          htmlFor="profile-input"
          className="group relative h-16 w-16 flex-shrink-0 cursor-pointer rounded-full"
        >
          <img
            src={String(imgPreview) || data?.profile_url}
            alt="Profile"
            className="h-[100%] w-[100%] rounded-full object-cover"
          />
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 justify-center rounded-full bg-black p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-40">
            <CameraIcon className="w-[80%]" stroke="white" />
          </div>
          <label
            htmlFor="profile-input"
            className="pointer-events-none absolute bottom-[-1] left-1/2 z-10 mt-4 -translate-x-1/2 text-nowrap rounded-md bg-black p-2 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-50"
          >
            Change Profile
          </label>
          <input
            id="profile-input"
            name="profile-input"
            data-testid="profile-input"
            type="file"
            className="hidden"
            ref={profileInput}
            onChange={(e) => handleImageChange(e, setImgPreview)}
          />
        </label>
      </div>
      <label htmlFor="name-input" className="font-semibold">
        Name
      </label>
      <input
        id="name-input"
        name="name-input"
        data-testid="name-input"
        className="form-input mb-4 px-4 py-2"
        type="text"
        maxLength={24}
        placeholder={data?.name}
        ref={nameInput}
      />
      <label htmlFor="email-input" className="font-semibold">
        Email
      </label>
      <input
        id="email-input"
        name="email-input"
        data-testid="email-input"
        type="email"
        className="form-input mb-4 px-4 py-2"
        placeholder={data?.email}
        ref={emailInput}
        maxLength={320}
      />
      <div className="mt-8 flex gap-4">
        <Button secondary={true} onClick={handleCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          Save
        </Button>
      </div>
      <ErrorMessage message={errorMessage} />
    </form>
  );
}

export default EditCard;
