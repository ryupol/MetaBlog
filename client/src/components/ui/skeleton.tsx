interface ShimmerProp {
  className: string;
}

// Loading animation
const Shimmer = ({ className }: ShimmerProp) => (
  <div
    className={`${className} relative overflow-hidden bg-theme-skeleton before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-theme-loading/60 before:to-transparent`}
  ></div>
);

export function CardSkeleton() {
  return (
    <div
      className={`flex w-full max-w-[392px] flex-col gap-4 rounded-[12px] border border-theme-border p-4 shadow-sm`}
    >
      <Shimmer className="h-[240px] w-full rounded-[6px]" />
      <div className="flex flex-col gap-4 p-2">
        <Shimmer className="mt-2 h-6 w-24 rounded-md" />
        <Shimmer className="h-6 w-full rounded-md" />
        <div className="flex items-center gap-3 rounded-md">
          <Shimmer className="h-9 w-9 rounded-full" />
          <Shimmer className="h-6 w-20 rounded-md" />
          <Shimmer className="h-6 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="max-container relative">
      <div className="h-[600px] w-full overflow-hidden rounded-xl">
        <Shimmer className="h-full w-full object-cover" />
        <div className="theme-base absolute bottom-[-64px] left-[64px] flex w-[598px] flex-col gap-4 rounded-xl border border-theme-border p-10 shadow-base">
          <Shimmer className="mt-2 h-6 w-24 rounded-md" />
          <Shimmer className="h-6 w-full rounded-md" />
          <Shimmer className="h-6 w-[70%] rounded-md" />
          <div className="mt-4 flex items-center gap-3 rounded-md">
            <Shimmer className="h-9 w-9 rounded-full" />
            <Shimmer className="mr-2 h-6 w-24 rounded-md" />
            <Shimmer className="h-6 w-24 rounded-md px-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function UserMenuSkeleton() {
  return <Shimmer className="relative h-11 w-11 rounded-full" />;
}

export function EditProfileSkeleton() {
  return (
    <div className="w-[40%] max-w-[600px] rounded-xl border border-theme-skeleton bg-theme-fbg p-10 text-theme-maintext">
      <div className="flex items-center justify-between">
        <Shimmer className="h-8 w-24 rounded-md px-2" />
        <Shimmer className="h-16 w-16 flex-shrink-0 cursor-pointer rounded-full" />
      </div>
      <div className="mt-10 flex flex-col gap-9">
        <Shimmer className="w-124 h-8 rounded-md px-2" />
        <Shimmer className="w-124 h-8 rounded-md px-2" />
        <div className="mt-8 flex gap-4">
          <Shimmer className="h-8 w-20 rounded-md px-2" />
          <Shimmer className="h-8 w-20 rounded-md px-2" />
        </div>
      </div>
    </div>
  );
}

export function BlogPageSkeleton() {
  return (
    <div className="max-container-blog flex flex-col gap-4 py-12">
      <Shimmer className="h-6 w-24 rounded-md px-2" />
      <Shimmer className="h-8 w-full rounded-md" />
      <div className="flex items-center gap-4">
        <Shimmer className="h-9 w-9 rounded-full" />
        <Shimmer className="h-6 w-24 rounded-md px-2" />
        <Shimmer className="h-6 w-24 rounded-md px-2" />
      </div>
      <Shimmer className="mb-8 aspect-video h-[300px] w-[100%] rounded-md object-cover" />
      <Shimmer className="h-6 w-full rounded-md px-2" />
      <Shimmer className="h-6 w-[40%] rounded-md px-2" />
      <Shimmer className="mt-10 h-6 w-[70%] rounded-md px-2" />
    </div>
  );
}
