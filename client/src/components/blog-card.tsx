import Profile from "./ui/profile";
import Tag from "./ui/tag";

type BlogCardType = {
  image: string;
  title: string;
  profile: string;
  name: string;
  date: string;
};

function BlogCard({ image, title, profile, name, date }: BlogCardType) {
  return (
    <div className="card-hover flex max-w-[330px] flex-col gap-4 rounded-[12px] border border-slate-200 p-[12px] shadow-sm">
      <div className="overflow-hidden rounded-[6px]">
        <img
          src={image}
          alt="Card Image"
          className="h-[200px] w-[100%] object-cover"
        />
      </div>
      <div className="mt-2">
        <Tag cat="Technology" />
      </div>
      <h2 className="line-clamp-3 leading-8">{title}</h2>
      <div className="flex flex-1 items-center gap-3 text-sm text-slate-gray">
        <Profile src={profile} />
        <span className="line-clamp-2 max-w-[120px]">{name}</span>
        <span className="whitespace-wrap">{date}</span>
      </div>
    </div>
  );
}

export default BlogCard;
