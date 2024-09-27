import { useEffect, useState } from "react";
import BlogCard from "../components/blog-card";
import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { CardsSkeleton } from "../components/ui/skeleton";
import axios from "axios";
import { BlogProps } from "../types/blog.type";
import { useQuery } from "react-query";

function Home() {
  const fetchBlogs = async () => {
    const response = await axios.get("/api/blogs");
    return response?.data;
  };
  const { data, isLoading } = useQuery("blogs", () => fetchBlogs());

  return (
    <main className="theme-base">
      <Navbar />
      <Header />
      <h1 className="max-container mb-8 mt-36">Latest Post</h1>
      <div
        id="blog"
        className="max-container mb-20 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {isLoading ? (
          <CardsSkeleton />
        ) : (
          data.map((d: BlogProps) => (
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
          ))
        )}
      </div>
      <Footer />
    </main>
  );
}

export default Home;
