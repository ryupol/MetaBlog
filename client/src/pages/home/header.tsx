import { advertiseId } from "../../global";
import { HeaderSkeleton } from "../../components/skeleton";
import Profile from "../../components/profile";
import Tag from "../../components/tag";
import formatDate from "../../utils/formatDate";
import useFetchBlogById from "../../hooks/useFetchBlogById";

function Header({ queryValue }: { queryValue: string }) {
  const { data, isLoading, isError } = useFetchBlogById(advertiseId);

  if (isLoading) return <HeaderSkeleton />;

  if (queryValue || isError) return <></>;

  return (
    <header className="max-container relative">
      <div className="max-h-[600px] w-full overflow-hidden rounded-xl">
        <img
          src={data?.image_url}
          alt="Header Blog image"
          className="w-full object-cover"
        />
        {/* Blog Header Card */}
        <a href={`blog/${data?.blog_id}`}>
          <div className="theme-base card-hover absolute bottom-[-64px] left-[64px] flex max-w-[598px] flex-col gap-4 rounded-xl border border-theme-border p-10 shadow-base">
            <div>
              <Tag cat={data?.tag} header={true} />
            </div>
            <h1 className="mb-2 text-[36px] font-semibold leading-10">
              {data?.title}
            </h1>
            <div className="flex items-center gap-3 text-theme-subtext3">
              <Profile src={data?.profile_url} className="h-9 w-9" />
              <p className="mr-2 font-medium">{data?.name}</p>
              <p className="whitespace-wrap px-2">
                {formatDate(data?.updated_at)}
              </p>
            </div>
          </div>
        </a>
      </div>
    </header>
  );
}

export default Header;
