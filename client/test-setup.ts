import "@testing-library/jest-dom";

import { afterAll, beforeAll, afterEach, vi } from "vitest";
import { server } from "./src/mocks/server";

beforeAll(() => {
  vi.clearAllMocks();
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());
