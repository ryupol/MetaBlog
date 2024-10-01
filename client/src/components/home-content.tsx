import { HomeContentSkeleton } from "./ui/skeleton";
import axios from "axios";
import { BlogProps } from "../types/blog.type";
import { useQuery } from "react-query";
import BlogCard from "./blog-card";
function HomeContent() {
  const fetchBlogs = async () => {
    const response = await axios.get("/api/blogs");
    return response?.data.data;
  };
  const { data, isLoading, error } = useQuery<BlogProps[], Error>("blogs", () =>
    fetchBlogs(),
  );

  if (isLoading) return <HomeContentSkeleton />;

  if (error) return <p className="max-container">{error.message}</p>;

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
            update_at={d.update_at}
          />
        </a>
      ))}
    </div>
  );
}

export default HomeContent;
