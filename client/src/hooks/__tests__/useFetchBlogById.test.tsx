import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { describe, it, expect, vi, Mock } from "vitest";
import axios from "axios";
import useFetchBlogById from "../useFetchBlogById";
import mockBlogs from "../../mocks/data/blogs";

vi.mock("axios");

describe("useFetchBlogById", () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("fetches and displays blog data by ID", async () => {
    (axios.get as Mock).mockResolvedValue({ data: mockBlogs[0] });

    const { result } = renderHook(() => useFetchBlogById(1), { wrapper });

    expect(result.current.isLoading).toBeTruthy();
    await waitFor(() => expect(result.current.data).toEqual(mockBlogs[0]));
  });
});
