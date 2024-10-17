import axios from "axios";
import { useQuery } from "react-query";
import { BlogProps } from "../types/blog.type";

function useFetchBlogById(id?: string | number) {
  const fetchBlogById = async () => {
    const response = await axios.get(`/api/blogs/${id}`);
    return response?.data;
  };

  return useQuery<BlogProps, Error>("blogData", fetchBlogById);
}

export default useFetchBlogById;
