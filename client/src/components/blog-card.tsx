import Profile from "./ui/profile";
import Tag from "./ui/tag";

interface BlogCardProps {
  image: string;
  title: string;
  profile: string;
  name: string;
  date: string;
}

function BlogCard({ image, title, profile, name, date }: BlogCardProps) {
  return (
    <section className="card-hover flex max-w-[392px] flex-col gap-4 rounded-xl border border-theme-border p-[16px] shadow-base">
      <div className="overflow-hidden rounded-md">
        <img
          src={image}
          alt="Card Image"
          className="h-[240px] w-[100%] object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-2">
        <div>
          <Tag cat="Technology" />
        </div>
        <h1 className="mb-1 line-clamp-3 font-semibold">{title}</h1>
        <div className="flex flex-1 items-center gap-3 text-theme-subtext3">
          <Profile src={profile} />
          <p className="mr-2 line-clamp-2 max-w-[120px] font-medium">{name}</p>
          <p className="whitespace-wrap">{date}</p>
        </div>
      </div>
    </section>
  );
}

export default BlogCard;
