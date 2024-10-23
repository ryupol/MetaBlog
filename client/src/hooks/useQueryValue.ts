import { useLocation } from "react-router-dom";

function useQueryValue(queryKey: string) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(queryKey);
}

export default useQueryValue;
