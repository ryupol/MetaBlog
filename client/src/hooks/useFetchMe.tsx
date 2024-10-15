import { useQuery } from "react-query";
import axios from "axios";
import { UserTokenProps } from "../types/user.type";

function useFetchMe() {
  return useQuery<UserTokenProps>(
    "getMe",
    async () => {
      const response = await axios.get("/api/users/me");
      return response.data;
    },
    {
      retry: false,
    },
  );
}

export default useFetchMe;
