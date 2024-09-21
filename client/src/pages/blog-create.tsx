import { useRef, useState } from "react";
import Navbar from "../components/navbar";
import Button from "../components/ui/button";
import {
  CameraIcon,
  FolderPlusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DropDown from "../components/ui/dropdown";
import handleFileChange from "../hooks/handleFileChange";

function BlogCreate() {
  const [imgPreview, setImgPreview] = useState<string>("");
  const [content, setContent] = useState<string>("");

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

  const tags = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Business",
    "Economy",
    "Sports",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(titleInput.current?.value);
    console.log(contentInput.current?.value);
  };
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
          <DropDown defaultValue="Select Tag" allValues={tags} />
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
          <p className="mt-2 text-red-500">Please fill all information</p>
        </form>
      </section>
    </main>
  );
}

export default BlogCreate;
