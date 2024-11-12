import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { describe, it, expect, vi, Mock } from "vitest";
import axios from "axios";
import useFetchMe from "../useFetchMe";
import mockUser from "../../mocks/data/user";

vi.mock("axios");

describe("useFetchMe", () => {
  const queryClient = new QueryClient();

  // Create a wrapper component for rendering the hook with QueryClientProvider
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("fetches user correctly", async () => {
    (axios.get as Mock).mockResolvedValue({ data: mockUser });

    const { result } = renderHook(() => useFetchMe(), { wrapper });

    expect(result.current.isLoading).toBeTruthy();
    await waitFor(() => expect(result.current.data).toEqual(mockUser));
  });

  it("should fail to fetches user", async () => {
    (axios.get as Mock).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useFetchMe(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
