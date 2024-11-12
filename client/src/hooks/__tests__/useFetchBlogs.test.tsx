import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { describe, it, expect, vi, Mock } from "vitest";
import axios from "axios";
import useFetchBlogs from "../useFetchBlogs";
import mockBlogs from "../../mocks/data/blogs";

vi.mock("axios");

describe("useFetchBlogs", () => {
  const queryClient = new QueryClient();

  // Create a wrapper component for rendering the hook with QueryClientProvider
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("fetches and displays all blogs", async () => {
    (axios.get as Mock).mockResolvedValue({ data: { data: mockBlogs } });

    const { result } = renderHook(() => useFetchBlogs(), { wrapper });

    expect(result.current.isLoading).toBeTruthy();
    await waitFor(() => expect(result.current.data).toEqual(mockBlogs));
  });
});
