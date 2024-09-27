import Navbar from "../components/navbar";
import Tag from "../components/ui/tag";
import Profile from "../components/ui/profile";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { BlogPageSkeleton } from "../components/ui/skeleton";
import axios from "axios";
import { BlogProps } from "../types/blog.type";
import { useParams } from "react-router-dom";
import formatDate from "../utils/formatDate";
import { useQuery } from "react-query";

function Blog() {
  const { id } = useParams();

  const fetchBlogData = async () => {
    const response = await axios.get(`/api/blogs/${id}`);
    return response?.data;
  };
  const { data, isLoading } = useQuery("blogData", () => fetchBlogData());

  return (
    <main className="theme-base">
      <Navbar />
      {isLoading ? (
        <BlogPageSkeleton />
      ) : (
        <>
          <section className="max-container-blog py-12">
            <Tag cat={data?.tag} header={true} />
            <h1 className="mt-4 text-2xl font-bold">{data?.title}</h1>
            <div className="text-slate-gray my-4 flex flex-1 items-center gap-3 text-xs">
              <Profile src={data?.profile_url} className="h-9 w-9" />
              <span className="line-clamp-2 max-w-[120px] font-semibold">
                {data?.name}
              </span>
              <span className="whitespace-wrap pl-4">
                {formatDate(data?.update_at)}
              </span>
            </div>
            <div className="overflow-hidden rounded-[6px]">
              <img
                src={data?.image_url}
                alt="Blog Image"
                className="aspect-video w-[100%] object-cover"
              />
            </div>
            <div className="content my-10">
              <div dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
            </div>
          </section>
          <Footer />
        </>
      )}
    </main>
  );
}

export default Blog;
