import { useLocation } from "react-router-dom";

function getQueryValue(queryKey: string) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(queryKey);
}

export default getQueryValue;
