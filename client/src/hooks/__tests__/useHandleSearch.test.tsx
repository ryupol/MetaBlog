import { describe, it, expect, vi, Mock } from "vitest";
import { useNavigate } from "react-router-dom";
import useHandleSearch from "../useHandleSearch";

// Mock the useNavigate hook
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  createSearchParams: vi.fn((params) => {
    return {
      toString: () => new URLSearchParams(params).toString(),
    };
  }),
}));

describe("useHandleSearch", () => {
  beforeEach(() => {
    (useNavigate as Mock).mockImplementation(() => navigate);
    vi.clearAllMocks();
  });

  const navigate = vi.fn();
  const event = {
    key: "Enter",
    preventDefault: vi.fn(),
  } as unknown as React.KeyboardEvent<HTMLInputElement>;

  it("should create search params if press enter", () => {
    const mockSearchRef = {
      current: { value: "haloworld" },
    } as React.RefObject<HTMLInputElement>;

    const handleSearch = useHandleSearch();
    handleSearch(event, mockSearchRef);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith({
      pathname: "/",
      search: "search_query=haloworld",
    });
  });

  it("should navigate to root if no search value", () => {
    const mockSearchRef = {
      current: { value: "" },
    } as React.RefObject<HTMLInputElement>;

    const handleSearch = useHandleSearch();
    handleSearch(event, mockSearchRef);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
