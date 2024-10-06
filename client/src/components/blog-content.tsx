import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  PencilIcon as PencilIconSolid,
  TrashIcon as TrashIconSolid,
} from "@heroicons/react/24/solid";

import formatDate from "../utils/formatDate";
import Footer from "./footer";
import Tag from "./ui/tag";
import Profile from "./ui/profile";
import { BlogContentSkeleton } from "./ui/skeleton";
import { BlogProps } from "../types/blog.type";
import { useNavigate } from "react-router-dom";
function BlogContent() {
  const navigate = useNavigate();

  const { id } = useParams();

  const handleDeleteBlog = async () => {
    await axios.post(`/api/blogs/delete/${id}`);
    navigate("/", { replace: true });
  };

  const fetchBlogData = async () => {
    const response = await axios.get(`/api/blogs/${id}`);
    return response?.data;
  };

  const { data, isLoading, error } = useQuery<BlogProps, Error>(
    "blogData",
    () => fetchBlogData(),
  );

  if (isLoading) return <BlogContentSkeleton />;

  if (error) return <p className="max-container-blog">{error.message}</p>;
  return (
    <>
      <article className="max-container-blog py-12">
        <header>
          <Tag cat={data?.tag} header={true} />
          <h1 className="mt-4 text-2xl font-bold">{data?.title}</h1>
        </header>
        <section className="flex items-center justify-between">
          <div className="text-slate-gray my-4 flex flex-1 items-center gap-3 text-xs">
            <Profile src={data?.profile_url} className="h-9 w-9" />
            <span className="line-clamp-2 max-w-[120px] font-semibold">
              {data?.name}
            </span>
            <time className="whitespace-wrap pl-4">
              {formatDate(data?.update_at)}
            </time>
          </div>

          {/* Edit and Delete Icons */}
          <div className="flex gap-2">
            <button className="group hover:cursor-pointer">
              <PencilIcon className="h-4 w-4 text-theme-subtext3 group-hover:hidden" />
              <PencilIconSolid className="hidden h-4 w-4 text-primary group-hover:block" />
            </button>

            <button
              onClick={handleDeleteBlog}
              className="group hover:cursor-pointer"
            >
              <TrashIcon className="h-4 w-4 text-theme-subtext3 group-hover:hidden" />
              <TrashIconSolid className="hidden h-4 w-4 text-red-500 group-hover:block" />
            </button>
          </div>
        </section>

        {/* Blog Image */}
        <figure className="overflow-hidden rounded-[6px]">
          <img
            src={data?.image_url}
            alt="Blog Image"
            className="aspect-video w-[100%] object-cover"
          />
        </figure>

        {/* Blog Content */}
        <section className="content my-10">
          <div dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
        </section>
      </article>

      <Footer />
    </>
  );
}

export default BlogContent;
