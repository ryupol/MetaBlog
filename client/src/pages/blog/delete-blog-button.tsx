import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/error-message";
import { ExclamationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { TrashIcon as TrashIconSolid } from "@heroicons/react/24/solid";
import useClickOutside from "../../hooks/useClickOutside";
import Button from "../../components/button";

function DeleteBlogButton() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // for loading while submitting

  const popupRef = useRef(null);

  useClickOutside(popupRef, () => setOpenPopup(false));

  const handleDelete = async () => {
    setLoading(true);

    try {
      await axios.post(`/api/blogs/delete/${id}`);
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        // Safely access error.response.data.message
        setErrorMessage(error.response?.data?.message || "An error occurred");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setOpenPopup(true)}
        className="group hover:cursor-pointer"
        data-testid="delete-button"
      >
        <TrashIcon className="h-4 w-4 text-theme-subtext3 group-hover:hidden" />
        <TrashIconSolid className="hidden h-4 w-4 text-red-500 group-hover:block" />
      </button>

      {/* Popup */}
      {openPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="theme-base flex w-full max-w-sm flex-col items-center gap-2 rounded-xl p-5 transition-all duration-300"
            ref={popupRef}
          >
            <ExclamationCircleIcon className="h-20 w-20 text-orange-300 opacity-80" />
            <h3 className="mb-2 text-xl font-semibold">Are you sure?</h3>
            <p className="mb-4">You won't be able to revert this!</p>
            <ErrorMessage message={errorMessage} />
            <div className="mt-2 flex justify-end gap-4">
              <Button type="submit" loading={loading} onClick={handleDelete}>
                Yes, delete it!
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-600/80 active:bg-red-600/50"
                type="button"
                onClick={() => setOpenPopup(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteBlogButton;
