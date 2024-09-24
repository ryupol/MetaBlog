export interface Blog {
  title: string;
  image_url: string;
  tag: string;
  content: string;
}

export type BlogData = Omit<Blog, "image_url">;

export type BlogCreated = Blog & { user_id: string };

export type BlogModel = BlogCreated & { blog_id: string };

export type AllBlogInfo = BlogModel & { name: string; profile_url: string };
