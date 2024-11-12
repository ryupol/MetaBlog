import { http, HttpResponse } from "msw";
import mockBlogs from "./data/blogs";
import mockUser from "./data/user";

export const handlers = [
  // All blogs
  http.get("/api/blogs", () => {
    return HttpResponse.json({ data: mockBlogs });
  }),

  // Get Blog
  http.get("/api/blogs/:id", ({ params }) => {
    const mockBlog = mockBlogs.find((x) => x.blog_id === Number(params.id));
    return HttpResponse.json(mockBlog);
  }),

  // Create Blog
  http.post("/api/blogs/create", async ({ request }) => {
    const newPost = await request.json();
    return HttpResponse.json(newPost, { status: 201 });
  }),
  // Register

  // Login

  // Get user
  http.get("/api/users/me", () => {
    return HttpResponse.json(mockUser); // Return some mock user data
  }),
];
