import { useQuery } from "react-query";
import axios from "axios";
import { BlogProps } from "../types/blog.type";

function useFetchBlogs() {
  return useQuery<BlogProps, Error>("blogData", async () => {
    const response = await axios.get(`/api/blogs`);
    return response?.data;
  });
}

export default useFetchBlogs;
