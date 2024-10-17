import axios from "axios";
import { useQuery } from "react-query";
import { UserTokenProps } from "../types/user.type";

function useFetchMe() {
  const fetchMe = async () => {
    const response = await axios.get("/api/users/me");
    return response.data;
  };

  return useQuery<UserTokenProps>("getMe", fetchMe, {
    retry: false,
  });
}

export default useFetchMe;
