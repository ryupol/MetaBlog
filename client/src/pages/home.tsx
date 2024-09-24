import { useEffect, useState } from "react";
import BlogCard from "../components/blog-card";
import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { CardsSkeleton } from "../components/ui/skeleton";
import axios from "axios";
import { BlogProps } from "../types/blog.type";

function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<BlogProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/blogs");
        setBlogs(response.data.data);
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
      <Header />
      <h1 className="max-container mb-8 mt-36">Latest Post</h1>
      <div
        id="blog"
        className="max-container mb-20 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {loading ? (
          <CardsSkeleton />
        ) : (
          blogs.map((b) => (
            <a key={b.blog_id} href={`/blog/${b.blog_id}`}>
              <BlogCard
                tag={b.tag}
                image_url={b.image_url}
                title={b.title}
                profile_url={b.profile_url}
                name={b.name}
                update_at={b.update_at}
              />
            </a>
          ))
        )}
      </div>
      <Footer />
    </main>
  );
}

export default Home;
