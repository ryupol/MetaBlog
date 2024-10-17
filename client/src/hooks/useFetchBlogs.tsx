import axios from "axios";
import { useQuery } from "react-query";
import { BlogProps } from "../types/blog.type";

function useFetchBlogs() {
  const fetchAllBlogs = async () => {
    const response = await axios.get("/api/blogs");
    return response?.data.data;
  };

  return useQuery<BlogProps[], Error>("blogs", fetchAllBlogs);
}

export default useFetchBlogs;
