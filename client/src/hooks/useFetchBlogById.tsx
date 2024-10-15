import { useQuery } from "react-query";
import axios from "axios";
import { BlogProps } from "../types/blog.type";

function useFetchBlogById(id?: string) {
  return useQuery<BlogProps, Error>("blogData", async () => {
    const response = await axios.get(`/api/blogs/${id}`);
    return response?.data;
  });
}

export default useFetchBlogById;
