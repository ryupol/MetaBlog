import BlogCard from "../components/blog-card";
import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { CardsSkeleton, HeaderSkeleton } from "../components/ui/skeleton";

function Home() {
  const data = [
    {
      blog_id: 1,
      title:
        "The Impact of Technology on the Workplace: How Technology is Changing",
      image: "https://picsum.photos/600/400",
      profile: "https://picsum.photos/200/200",
      name: "Tracey Wilson",
      date: "May 20, 2022",
    },
    {
      blog_id: 2,
      title:
        "The Impact of Technology on the Workplace: How Technology is Changing",
      image: "https://picsum.photos/600/100",
      profile: "https://picsum.photos/600/200",
      name: "Tracey Wilson",
      date: "August 20, 2022",
    },
    {
      blog_id: 3,
      title:
        "The Impact of Technology on the Workplace: How Technology is Changing",
      image: "https://picsum.photos/600/800",
      profile: "https://picsum.photos/200/200",
      name: "Polawat Maniratanapisut",
      date: "June 20, 2022",
    },
    {
      blog_id: 4,
      title:
        "The Impact of Technology on the Workplace: How Technology is Changing",
      image: "https://picsum.photos/600/400",
      profile: "https://picsum.photos/200/200",
      name: "Alice England",
      date: "August 20, 2022",
    },
    {
      blog_id: 5,
      title:
        "The Impact of Technology on the Workplace: How Technology is Changing",
      image: "https://picsum.photos/600/400",
      profile: "https://picsum.photos/200/200",
      name: "Tracey Wilson",
      date: "December 20, 2022",
    },
    {
      blog_id: 6,
      title:
        "The Impact of Technology on the Workplace: How Technology is Changing",
      image: "https://picsum.photos/600/400",
      profile: "https://picsum.photos/200/200",
      name: "Jason Francisco",
      date: "November 20, 2022",
    },
  ];
  return (
    <main className="theme-base">
      <Navbar />
      <Header />
      <br />
      <br />
      <br />
      <HeaderSkeleton />

      <h1 className="max-container mb-8 mt-36">Latest Post</h1>
      <div
        id="blog"
        className="max-container mb-20 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {data.map((d) => (
          <BlogCard
            image={d.image}
            title={d.title}
            profile={d.profile}
            name={d.name}
            date={d.date}
            key={d.blog_id}
          />
        ))}
        <CardsSkeleton />
      </div>
      <Footer />
    </main>
  );
}

export default Home;
