import { AxiosError } from "axios";
import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  CameraIcon,
  FolderPlusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import DropDown from "./ui/dropdown";
import Button from "./ui/button";
import ErrorMessage from "./ui/error-message";
import handleFileChange from "../hooks/handleFileChange";

interface BlogEditorProps {
  initialTitle?: string;
  initialTag?: string;
  initialImage?: string;
  initialContent?: string;
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
}

function BlogEditor({
  initialTitle = "",
  initialTag = "",
  initialContent = "",
  initialImage = "",
  onSubmit,
  submitLabel = "",
}: BlogEditorProps) {
  const [title, setTitle] = useState<string>(initialTitle);
  const [selectedTag, setSelectedTag] = useState<string>(
    initialTag || "Select Tag",
  );
  const [content, setContent] = useState<string>(initialContent);
  const [imgPreview, setImgPreview] = useState<string>(initialImage);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const titleInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<ReactQuill>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const title = titleInput.current?.value || "";
    const tag = selectedTag || "Select Tag";
    const image = fileInput?.current?.files?.[0] || "";
    const contentValue = contentInput.current?.value || content;

    if (!title || tag === "Select Tag" || !image || !contentValue) {
      setErrorMessage("Please fill in all fields and select a valid tag.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set("title", title);
    formData.set("tag", tag);
    formData.set("image", image);
    formData.set("content", contentValue);

    try {
      await onSubmit(formData);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // Safely access error.response.data.message
        setErrorMessage(error.response.data.message || "An error occurred");
      } else {
        setErrorMessage("Failed to create blog. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-2">Blog Editor</h1>
      <hr className="border border-theme-border" />

      {/* Blog Title */}
      <p className="mt-6 py-2 font-semibold">Blog Title</p>
      <input
        ref={titleInput}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Type Blog title"
        className="form-input p-2"
      />

      {/* Blog Tag */}
      <p className="mt-4 py-2 font-semibold">Blog Tag</p>
      <DropDown
        defaultValue={selectedTag}
        allValues={[
          "Technology",
          "Lifestyle",
          "Travel",
          "Business",
          "Economy",
          "Sports",
        ]}
        onSelect={(value: string) => setSelectedTag(value)}
      />

      {/* Blog Image */}
      <p className="mt-4 py-2 font-semibold">Blog Image</p>
      {imgPreview ? (
        <label htmlFor="file-input" className="group">
          <div className="relative h-[400px] w-full cursor-pointer overflow-hidden rounded-xl">
            <img
              src={imgPreview}
              alt="Blog Image"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform justify-center rounded-full bg-black p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-70">
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

      {/* Blog Content */}
      <p className="mt-4 py-2 font-semibold">Blog Content</p>
      <ReactQuill
        ref={contentInput}
        value={content}
        onChange={setContent}
        theme="snow"
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            [{ "code-block": true }],
            ["clean"],
          ],
        }}
        className="mb-8"
      />

      {/* Submit Button */}
      <Button className="flex gap-2" loading={loading}>
        {!loading ? <PlusIcon className="w-5" /> : null}
        <p>{submitLabel || "Submit"}</p>
      </Button>

      {/* Error Message */}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </form>
  );
}

export default BlogEditor;
