import { useParams } from "react-router-dom";

import DeleteBlogButton from "./delete-blog-button";
import EditBlogButton from "./edit-blog-button";

import formatDate from "@/utils/formatDate";

import Footer from "@/components/footer";
import Tag from "@/components/tag";
import Profile from "@/components/profile";
import { BlogContentSkeleton } from "@/components/skeleton";
import ErrorPopup from "@/components/error-popup";

import useFetchMe from "@/hooks/useFetchMe";
import useFetchBlogById from "@/hooks/useFetchBlogById";

function BlogContent() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchBlogById(id);

  const { data: user } = useFetchMe();

  if (isLoading) return <BlogContentSkeleton />;

  if (error) return <ErrorPopup message={error.message} />;

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
            <span
              data-cy="creator-name"
              className="line-clamp-2 max-w-[120px] font-semibold"
            >
              {data?.name}
            </span>
            <time className="whitespace-wrap pl-4">
              {formatDate(data?.updated_at)}
            </time>
          </div>

          {/* Edit and Delete Icons */}
          {data?.user_id === user?.id ? (
            <div className="flex gap-2" data-testid="edit-del-wrapper">
              <EditBlogButton />
              <DeleteBlogButton />
            </div>
          ) : null}
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
