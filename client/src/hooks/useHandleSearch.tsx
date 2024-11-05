import { useNavigate, createSearchParams } from "react-router-dom";

const useHandleSearch = () => {
  const navigate = useNavigate();

  const handleSearch = (
    e: React.KeyboardEvent<HTMLInputElement>,
    searchRef: React.RefObject<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = searchRef.current?.value;
      if (!value) {
        navigate("/");
        return;
      }

      navigate({
        pathname: "/",
        search: createSearchParams({ search_query: value }).toString(),
      });
    }
  };

  return handleSearch;
};

export default useHandleSearch;
