import BlogCard from "../components/card";
import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";

function Home() {
  const data = [
    {
      title:
        "The Impact of Technology on the Workplace: How Technology is Changing",
      image: "https://picsum.photos/600/400",
      profile: "https://picsum.photos/200/200",
      name: "Tracey Wilson",
      date: "May 20, 2022",
    },
    {
      title:
        "The Impact of Technology on the Workplace: How Technology is Changing",
      image: "https://picsum.photos/600/400",
      profile: "https://picsum.photos/200/200",
      name: "Tracey Wilson",
      date: "August 20, 2022",
    },
    {
      title:
        "The Impact of Technology on the Workplace: How Technology is Changing",
      image: "https://picsum.photos/600/400",
      profile: "https://picsum.photos/200/200",
      name: "Polawat Maniratanapisut",
      date: "June 20, 2022",
    },
    {
      title:
        "The Impact of Technology on the Workplace: How Technology is Changing",
      image: "https://picsum.photos/600/400",
      profile: "https://picsum.photos/200/200",
      name: "Alice England",
      date: "August 20, 2022",
    },
    {
      title:
        "The Impact of Technology on the Workplace: How Technology is Changing",
      image: "https://picsum.photos/600/400",
      profile: "https://picsum.photos/200/200",
      name: "Tracey Wilson",
      date: "December 20, 2022",
    },
    {
      title:
        "The Impact of Technology on the Workplace: How Technology is Changing",
      image: "https://picsum.photos/600/400",
      profile: "https://picsum.photos/200/200",
      name: "Jason Francisco",
      date: "November 20, 2022",
    },
  ];
  return (
    <main>
      <Navbar />
      <Header />
      <h3 className="max-container mb-2 mt-20 text-xl font-bold">
        Latest Post
      </h3>
      <div className="max-container grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3">
        {data.map((d) => (
          <BlogCard
            image={d.image}
            title={d.title}
            profile={d.profile}
            name={d.name}
            date={d.date}
          />
        ))}
      </div>
      <Footer />
    </main>
  );
}

export default Home;
