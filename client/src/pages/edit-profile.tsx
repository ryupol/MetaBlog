import Button from "../components/ui/button";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import handleFileChange from "../hooks/handleFileChange";
import { useLocation, useNavigate } from "react-router-dom";
import { EditProfileSkeleton } from "../components/ui/skeleton";

function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const previousUrl: string = location.state.previousUrl
    ? location.state.previousUrl
    : "/";
  const data = {
    name: "Tracey Wilson",
    profile_url:
      "https://res.cloudinary.com/dxwmjflhh/image/upload/profile.webp",
    email: "tracey@hotmail.com",
  };
  const [profilePreview, setProfilePreview] = useState<string>(
    data.profile_url,
  );
  const profileInput = useRef<HTMLInputElement>(null);

  return (
    <main className="theme-base flex min-h-screen w-full items-center justify-center">
      <section className="w-[40%] max-w-[600px] rounded-xl border border-theme-skeleton bg-theme-fbg p-10 text-theme-maintext">
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
              onChange={(e) =>
                handleFileChange(e, {
                  onFileLoad: (result) => setProfilePreview(result as string),
                })
              }
            />
          </label>
        </div>
        <form>
          <p className="mt-4 font-semibold">Name</p>
          <input
            className="form-input px-4 py-2"
            type="text"
            placeholder={data.name}
          />
          <p className="mt-4 font-semibold">Email</p>
          <input
            className="form-input px-4 py-2"
            type="text"
            placeholder={data.email}
          />
          <div className="mt-8 flex gap-4">
            <Button
              secondary={true}
              onClick={(e) => {
                e.preventDefault;
                navigate(previousUrl);
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => navigate(previousUrl)}>Save</Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default EditProfile;
