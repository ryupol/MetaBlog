import Navbar from "../components/navbar";
import Tag from "../components/ui/tag";
import Profile from "../components/ui/profile";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { BlogPageSkeleton } from "../components/ui/skeleton";
import axios from "axios";
import { BlogProps } from "../types/blog.type";
import { useParams } from "react-router-dom";
import formatDate from "../utils/formatDate";

function Blog() {
  const [loading, setLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<BlogProps | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="theme-base">
      <Navbar />
      {loading ? (
        <BlogPageSkeleton />
      ) : (
        <>
          <section className="max-container-blog py-12">
            <Tag cat={blog?.tag} header={true} />
            <h1 className="mt-4 text-2xl font-bold">{blog?.title}</h1>
            <div className="text-slate-gray my-4 flex flex-1 items-center gap-3 text-xs">
              <Profile src={blog?.profile_url} className="h-9 w-9" />
              <span className="line-clamp-2 max-w-[120px] font-semibold">
                {blog?.name}
              </span>
              <span className="whitespace-wrap pl-4">
                {formatDate(blog?.update_at)}
              </span>
            </div>
            <div className="overflow-hidden rounded-[6px]">
              <img
                src={blog?.image_url}
                alt="Blog Image"
                className="aspect-video w-[100%] object-cover"
              />
            </div>
            <div className="content my-10">
              <div dangerouslySetInnerHTML={{ __html: blog?.content || "" }} />
            </div>
          </section>
          <Footer />
        </>
      )}
    </main>
  );
}

export default Blog;
