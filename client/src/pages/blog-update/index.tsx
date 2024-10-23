import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import useFetchBlogById from "../../hooks/useFetchBlogById";
import useFetchMe from "../../hooks/useFetchMe";

import BlogEditor from "../../components/blog-editor";
import Forbidden from "../../components/forbidden";
import Navbar from "../../components/navbar";

const BlogEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const handleUpdateBlog = async (formData: FormData) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const objectformData = Object.fromEntries(formData);
    await axios.post(`/api/blogs/update/${id}`, objectformData, config);
    navigate(`/blog/${id}`);
  };

  const { data, isLoading, isError } = useFetchBlogById(id);

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useFetchMe();

  if (isLoading || isLoadingUser)
    return <div className="theme-base h-full w-full"></div>;

  if (isError || isErrorUser || Number(user?.id) !== Number(data?.user_id))
    return <Forbidden />;

  return (
    <main className="theme-base min-h-screen">
      <Navbar />
      <section className="max-container-blog my-auto p-12">
        <BlogEditor
          initialTitle={data?.title}
          initialTag={data?.tag}
          initialImage={data?.image_url}
          initialContent={data?.content}
          onSubmit={handleUpdateBlog}
          submitLabel="Update Blog Post"
        />
      </section>
    </main>
  );
};

export default BlogEdit;
