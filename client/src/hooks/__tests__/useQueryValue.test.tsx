import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { useLocation } from "react-router-dom";
import useQueryValue from "../useQueryValue";

vi.mock("react-router-dom", () => ({
  useLocation: vi.fn(),
}));

describe("useQueryValue", () => {
  it("return correct query parameter value", () => {
    (useLocation as Mock).mockReturnValue({ search: "?name=John" });

    const { result } = renderHook(() => useQueryValue("name"));
    expect(result.current).toEqual("John");
  });

  it("return null if query wrong parameter", () => {
    (useLocation as Mock).mockReturnValue({ search: "?name=John" });

    const { result } = renderHook(() => useQueryValue("missing"));
    expect(result.current).toEqual(null);
  });
});
