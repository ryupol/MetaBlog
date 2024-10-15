import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import BlogEditor from "../components/blog-editor"; // Assuming BlogEditor is in components
import Forbidden from "./forbidden";
import useFetchMe from "../hooks/useFetchMe";

function BlogCreate() {
  const navigate = useNavigate();
  const location = useLocation();

  // Handling form submission inside BlogCreate
  const handleCreateBlog = async (formData: FormData) => {
    const previousUrl: string = location.state?.previousUrl || "/";

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    await axios.post("/api/blogs/create", formData, config);
    navigate(previousUrl, { replace: true });
  };

  const { isLoading, isError } = useFetchMe();

  if (isLoading) return <div className="theme-base h-full w-full"></div>;

  if (isError) return <Forbidden />;

  return (
    <main className="theme-base min-h-screen">
      <Navbar />
      <section className="max-container-blog my-auto p-12">
        <BlogEditor
          onSubmit={handleCreateBlog}
          submitLabel="Create Blog Post"
        />
      </section>
    </main>
  );
}

export default BlogCreate;
