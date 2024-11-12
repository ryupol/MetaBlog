import { describe, expect, it } from "vitest";
import formatDate from "../formatDate";

describe("formatDate", () => {
  it("should return 'Unknown date' for undefined input", () => {
    expect(formatDate(undefined)).toBe("Unknown date");
  });

  it("should format a valid ISO date string", () => {
    const date = "2023-11-09T10:15:30Z";
    expect(formatDate(date)).toBe("November 9, 2023");
  });

  it("should return 'Invalid Date' for an invalid date string", () => {
    const invalidDate = "invalid-date";
    expect(formatDate(invalidDate)).toBe("Invalid Date");
  });

  it("should handle edge case dates correctly", () => {
    const edgeDate = "1970-01-01T00:00:00Z";
    expect(formatDate(edgeDate)).toBe("January 1, 1970");
  });
});
