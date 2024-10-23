import BlogCard from "./blog-card";
import { BlogProps } from "../../types/blog.type";
import { advertiseId } from "../../global";
import ErrorPopup from "../../components/error-popup";
import { HomeContentSkeleton } from "../../components/skeleton";
import useFetchBlogs from "../../hooks/useFetchBlogs";

function HomeContent({ queryValue }: { queryValue: string }) {
  const { data, isLoading, error } = useFetchBlogs();
  const adId = queryValue ? "" : advertiseId;

  if (isLoading) return <HomeContentSkeleton />;

  if (error) return <ErrorPopup message={error.message} />;

  return (
    <div
      id="blog"
      className="max-container mb-20 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {data
        ?.slice()
        .filter((d: BlogProps) => d.blog_id != String(adId))
        .filter((d: BlogProps) =>
          d.title.toLowerCase().includes(String(queryValue.toLowerCase())),
        )
        .map((d: BlogProps) => (
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
        )) || <p className="theme-base">No blog found</p>}
    </div>
  );
}

export default HomeContent;
