import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  CameraIcon,
  FolderPlusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import handleFileChange from "../hooks/handleFileChange";
import Navbar from "../components/navbar";
import Button from "../components/ui/button";
import DropDown from "../components/ui/dropdown";
import ErrorMessage from "../components/ui/error-message";
import Forbidden from "./forbidden";

function BlogCreate() {
  const navigate = useNavigate();
  const location = useLocation();

  const [imgPreview, setImgPreview] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("Select Tag");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const tags = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Business",
    "Economy",
    "Sports",
  ];

  const titleInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<ReactQuill | null>(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = titleInput.current?.value || "";
    const tag = selectedTag || "Select Tag";
    const image = fileInput?.current?.files?.[0] || "";
    const content = contentInput.current?.value || "";

    if (!title || tag === "Select Tag" || !image || !content) {
      setErrorMessage("Please fill in all fields and select a valid tag.");
      return; // Return early if validation fails
    }

    const formData = new FormData();
    formData.set("title", title);
    formData.set("tag", tag);
    formData.set("image", image);
    formData.set("content", content);

    const previousUrl: string = location.state?.previousUrl || "/";

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const objectformData = Object.fromEntries(formData);
      await axios.post("/api/blogs/create", objectformData, config);
      navigate(previousUrl, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // Safely access error.response.data.message
        setErrorMessage(error.response.data.message || "An error occurred");
      } else {
        setErrorMessage("Failed to create blog. Please try again.");
      }
    }
  };

  const { isLoading, isError } = useQuery(
    "checkAuthentication",
    async () => {
      await axios.get("/api/users/me");
      return;
    },
    { retry: false },
  );
  if (isLoading) return <div className="theme-base h-full w-full"></div>;

  if (isError) return <Forbidden />;
  return (
    <main className="theme-base min-h-screen">
      <Navbar />
      <section className="max-container-blog my-auto p-12">
        <form onSubmit={handleSubmit}>
          <h1 className="mb-2">Blog Editor</h1>
          <hr className="border border-theme-border" />
          <p className="mt-6 py-2 font-semibold">Blog Title</p>
          <input
            ref={titleInput}
            placeholder="Type Blog title"
            className="form-input p-2"
          />
          <p className="mt-4 py-2 font-semibold">Blog Tag</p>
          <DropDown
            defaultValue={selectedTag}
            allValues={tags}
            onSelect={(value: string) => setSelectedTag(value)}
          />
          <p className="mt-4 py-2 font-semibold">Blog Image</p>
          {imgPreview ? (
            <label htmlFor="file-input" className="group">
              <div className="relative h-[400px] w-full cursor-pointer overflow-hidden rounded-xl">
                <img
                  src={imgPreview}
                  alt="Blog Image"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform justify-center rounded-full bg-black p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-40">
                  <CameraIcon className="w-[80%]" stroke="white" />
                </div>
              </div>
            </label>
          ) : (
            <label
              htmlFor="file-input"
              className="z-1 relative flex cursor-pointer gap-4 rounded-md border border-dashed border-theme-skeleton px-4 py-2 outline-none hover:bg-theme-fbg active:bg-theme-fbg/60"
            >
              <FolderPlusIcon className="h-6 w-6" />
              <span>Add Image</span>
            </label>
          )}
          <input
            id="file-input"
            className="hidden"
            type="file"
            ref={fileInput}
            onChange={(e) =>
              handleFileChange(e, {
                onFileLoad: (result) => setImgPreview(result as string),
              })
            }
          />

          <p className="mt-4 py-2 font-semibold">Blog Content</p>
          <ReactQuill
            ref={contentInput}
            value={content}
            onChange={setContent}
            theme="snow"
            modules={modules}
            className="mb-8"
          />

          <Button className="flex gap-2">
            <PlusIcon className="w-5" />
            <p>Create Blog Post</p>
          </Button>
          <ErrorMessage text={errorMessage} />
        </form>
      </section>
    </main>
  );
}

export default BlogCreate;
