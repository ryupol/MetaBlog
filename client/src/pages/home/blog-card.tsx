import { BlogInfo } from "../../types/blog.type";
import formatDate from "../../utils/formatDate";
import Profile from "../../components/profile";
import Tag from "../../components/tag";

function BlogCard({
  tag,
  title,
  profile_url,
  name,
  updated_at,
  image_url,
}: BlogInfo) {
  return (
    <article
      data-cy="blog-card"
      className="card-hover flex max-w-[392px] flex-col gap-4 rounded-xl border border-theme-border p-4 shadow-base"
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={image_url}
          alt="Card Image"
          className="h-[240px] w-[100%] object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-2">
        <div>
          <Tag cat={tag} />
        </div>
        <h1 className="mb-1 line-clamp-3 h-[88px] font-semibold">{title}</h1>
        <div className="flex flex-1 items-center gap-3 text-theme-subtext3">
          <Profile src={profile_url} className="h-9 w-9" />
          <span className="mr-2 max-w-[130px] overflow-clip text-nowrap font-medium">
            {name}
          </span>
          <time className="overflow-hidden text-wrap">
            {formatDate(updated_at)}
          </time>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
