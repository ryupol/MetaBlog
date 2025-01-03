import { AxiosError } from "axios";
import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  CameraIcon,
  FolderPlusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import DropDown from "./dropdown";
import Button from "./button";
import ErrorMessage from "./error-message";
import handleImageChange from "../hooks/handleImageChange";

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

    const titleSubmit = titleInput.current?.value || title;
    const tagSubmit = selectedTag || "Select Tag";
    const imageSubmit = fileInput?.current?.files?.[0] || imgPreview;
    const contentValueSubmit = contentInput.current?.value || content;

    if (
      !titleSubmit ||
      tagSubmit === "Select Tag" ||
      !imageSubmit ||
      !contentValueSubmit
    ) {
      setErrorMessage("Please fill in all fields and select a valid tag.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set("title", titleSubmit);
    formData.set("tag", tagSubmit);
    formData.set("image", imageSubmit);
    formData.set("content", contentValueSubmit);

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
      <label htmlFor="blog-title" className="mt-6 block py-2 font-semibold">
        Blog Title
      </label>
      <input
        type="text"
        id="blog-title"
        name="blog-title"
        ref={titleInput}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Type Blog title"
        className="form-input p-2"
      />

      {/* Blog Tag */}
      <div data-testid="blog-tag-wrapper">
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
      </div>

      {/* Blog Image */}
      <p className="mt-4 py-2 font-semibold">Blog Image</p>
      {imgPreview ? (
        <label data-cy="image-input" htmlFor="file-input" className="group">
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
        data-testid="file-input"
        ref={fileInput}
        onChange={(e) => handleImageChange(e, setImgPreview)}
      />

      {/* Blog Content */}
      <p className="mt-4 block py-2 font-semibold">Blog Content</p>
      <div data-testid="blog-editor-wrapper">
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
      </div>

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
