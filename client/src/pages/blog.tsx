import Navbar from "../components/navbar";
import Tag from "../components/tag";
import Profile from "../components/profile";

function Blog() {
  const data = {
    title:
      "The Impact of Technology on the Workplace: How Technology is Changing",
    image: "https://picsum.photos/600/800",
    profile: "https://picsum.photos/200/200",
    name: "Tracey Wilson",
    date: "May 20, 2022",
  };

  return (
    <main>
      <Navbar />
      <section className="max-container px-56 py-12">
        <Tag cat="Technology" header={true} />
        <h1 className="mt-4 text-2xl font-bold">{data.title}</h1>
        <div className="my-4 flex flex-1 items-center gap-3 text-xs text-slate-gray">
          <Profile src={data.profile} />
          <span className="line-clamp-2 max-w-[120px] font-semibold">
            {data.name}
          </span>
          <span className="whitespace-wrap pl-4">{data.date}</span>
        </div>
        <div className="overflow-hidden rounded-[6px]">
          <img
            src={data.image}
            alt="Blog Image"
            className="h-[400px] w-[100%] object-cover"
          />
        </div>
      </section>
    </main>
  );
}

export default Blog;
