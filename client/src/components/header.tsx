import { useEffect, useState } from "react";
import Profile from "./ui/profile";
import Tag from "./ui/tag";
import axios from "axios";
import { BlogProps } from "../types/blog.type";
import { advertiseId } from "../global";
import { HeaderSkeleton } from "./ui/skeleton";
import formatDate from "../utils/formatDate";
import { useQuery } from "react-query";

function Header() {
  const fetchBlogHeader = async () => {
    const response = await axios.get(`/api/blogs/${advertiseId}`);
    return response?.data;
  };
  const { data, isLoading } = useQuery("blogHeader", () => fetchBlogHeader());

  if (isLoading) return <HeaderSkeleton />;

  return (
    <header className="max-container relative">
      <div className="max-h-[600px] w-full overflow-hidden rounded-xl">
        <img
          src={data?.image_url}
          alt="Header Blog image"
          className="w-full object-cover"
        />
        <a href={`blog/${data?.blog_id}`}>
          <HeaderCard blogData={data} />
        </a>
      </div>
    </header>
  );
}

function HeaderCard({ blogData }: { blogData: BlogProps | null }) {
  return (
    <div className="theme-base card-hover absolute bottom-[-64px] left-[64px] flex max-w-[598px] flex-col gap-4 rounded-xl border border-theme-border p-10 shadow-base">
      <div>
        <Tag cat={blogData?.tag} header={true} />
      </div>
      <h1 className="mb-2 text-[36px] font-semibold leading-10">
        {blogData?.title}
      </h1>
      <div className="flex items-center gap-3 text-theme-subtext3">
        <Profile src={blogData?.profile_url} className="h-9 w-9" />
        <p className="mr-2 font-medium">{blogData?.name}</p>
        <p className="whitespace-wrap px-2">
          {formatDate(blogData?.update_at)}
        </p>
      </div>
    </div>
  );
}

export default Header;
