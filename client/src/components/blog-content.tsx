import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ExclamationCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  PencilIcon as PencilIconSolid,
  TrashIcon as TrashIconSolid,
} from "@heroicons/react/24/solid";

import formatDate from "../utils/formatDate";

import Footer from "./footer";
import Tag from "./ui/tag";
import Profile from "./ui/profile";
import { BlogContentSkeleton } from "./ui/skeleton";
import Button from "./ui/button";
import ErrorPopup from "./ui/error-popup";
import ErrorMessage from "./ui/error-message";

import useClickOutside from "../hooks/useClickOutside";
import useFetchMe from "../hooks/useFetchMe";
import useFetchBlogById from "../hooks/useFetchBlogById";

function BlogContent() {
  const { id } = useParams();

  const { data, isLoading, error } = useFetchBlogById(id);

  const { data: user } = useFetchMe();

  if (isLoading) return <BlogContentSkeleton />;

  if (error) return <ErrorPopup message={error.message} />;

  return (
    <>
      <article className="max-container-blog py-12">
        <header>
          <Tag cat={data?.tag} header={true} />
          <h1 className="mt-4 text-2xl font-bold">{data?.title}</h1>
        </header>
        <section className="flex items-center justify-between">
          <div className="text-slate-gray my-4 flex flex-1 items-center gap-3 text-xs">
            <Profile src={data?.profile_url} className="h-9 w-9" />
            <span className="line-clamp-2 max-w-[120px] font-semibold">
              {data?.name}
            </span>
            <time className="whitespace-wrap pl-4">
              {formatDate(data?.updated_at)}
            </time>
          </div>

          {/* Edit and Delete Icons */}
          {data?.user_id === user?.id ? (
            <div className="flex gap-2">
              <EditButton />
              <DeleteButton />
            </div>
          ) : null}
        </section>

        {/* Blog Image */}
        <figure className="overflow-hidden rounded-[6px]">
          <img
            src={data?.image_url}
            alt="Blog Image"
            className="aspect-video w-[100%] object-cover"
          />
        </figure>

        {/* Blog Content */}
        <section className="content my-10">
          <div dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
        </section>
      </article>

      <Footer />
    </>
  );
}

function EditButton() {
  const { id } = useParams();

  return (
    <a className="group hover:cursor-pointer" href={`/edit/blog/${id}`}>
      <PencilIcon className="h-4 w-4 text-theme-subtext3 group-hover:hidden" />
      <PencilIconSolid className="hidden h-4 w-4 text-primary group-hover:block" />
    </a>
  );
}
function DeleteButton() {
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
      if (error instanceof AxiosError && error.response) {
        // Safely access error.response.data.message
        setErrorMessage(error.response.data.message || "An error occurred");
      } else {
        setErrorMessage("Failed to delete. Please try again.");
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
      >
        <TrashIcon className="h-4 w-4 text-theme-subtext3 group-hover:hidden" />
        <TrashIconSolid className="hidden h-4 w-4 text-red-500 group-hover:block" />
      </button>

      {/* Popup */}
      <div
        className={`${
          openPopup ? `flex` : `hidden`
        } fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-50`}
      >
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
    </>
  );
}
export default BlogContent;
