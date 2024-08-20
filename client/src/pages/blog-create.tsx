import { useState } from "react";
import Navbar from "../components/navbar";
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
  return (
    <main>
      <Navbar />
      <section className="max-container px-56 py-12">
        <form action="">
          <p>Blog Title</p>
          <input />
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            modules={modules}
          />
        </form>

        <div>
          <h2>Preview</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </section>
    </main>
  );
}

export default BlogCreate;
