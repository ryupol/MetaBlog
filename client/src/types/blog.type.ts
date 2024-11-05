export interface BlogProps {
  blog_id: number;
  tag: string;
  title: string;
  profile_url: string;
  name: string;
  updated_at: string;
  image_url: string;
  content: string;
  user_id: number;
}

export type BlogInfo = Omit<BlogProps, "blog_id" | "content" | "user_id">;
