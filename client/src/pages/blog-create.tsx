import { useRef, useState } from "react";
import Navbar from "../components/navbar";
import Button from "../components/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function BlogCreate() {
  const [content, setContent] = useState<string>("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };

  const titleInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<ReactQuill | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(titleInput.current?.value);
    console.log(contentInput.current?.value);
  };
  return (
    <main>
      <Navbar />
      <section className="max-container-blog my-auto p-12">
        <form onSubmit={handleSubmit}>
          <h1 className="mb-2">Blog Editor</h1>
          <hr />
          <p className="mt-6 py-2 font-semibold">Blog Title</p>
          <input
            ref={titleInput}
            placeholder="Type Blog title"
            className="mb-4 w-full rounded border border-gray-300 p-2 placeholder:text-sm focus:outline-blue-200"
          />
          <p className="py-2 font-semibold">Blog Content</p>
          <ReactQuill
            ref={contentInput}
            value={content}
            onChange={setContent}
            theme="snow"
            modules={modules}
            className="mb-4"
          />

          <Button className="flex gap-2">
            <PlusIcon className="w-5" />
            <p>Create Blog Post</p>
          </Button>
        </form>
        <div className="mt-12">
          <h2>Preview</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </section>
    </main>
  );
}

export default BlogCreate;
