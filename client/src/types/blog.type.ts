export interface BlogProps {
  blog_id: string;
  tag: string;
  title: string;
  profile_url: string;
  name: string;
  updated_at: string;
  image_url: string;
  content: string;
  user_id: string;
}

export type BlogInfo = Omit<BlogProps, "blog_id" | "content" | "user_id">;
