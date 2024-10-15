import axios from "axios";
import BlogCard from "./blog-card";
import { useQuery } from "react-query";
import { HomeContentSkeleton } from "./ui/skeleton";
import { BlogProps } from "../types/blog.type";
import ErrorPopup from "./ui/error-popup";

function HomeContent() {
  const fetchBlogs = async () => {
    const response = await axios.get("/api/blogs");
    return response?.data.data;
  };
  const { data, isLoading, error } = useQuery<BlogProps[], Error>("blogs", () =>
    fetchBlogs(),
  );

  if (isLoading) return <HomeContentSkeleton />;

  if (error) return <ErrorPopup message={error.message} />;

  return (
    <div
      id="blog"
      className="max-container mb-20 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {data?.map((d: BlogProps) => (
        <a key={d.blog_id} href={`/blog/${d.blog_id}`}>
          <BlogCard
            tag={d.tag}
            image_url={d.image_url}
            title={d.title}
            profile_url={d.profile_url}
            name={d.name}
            updated_at={d.updated_at}
          />
        </a>
      ))}
    </div>
  );
}

export default HomeContent;
