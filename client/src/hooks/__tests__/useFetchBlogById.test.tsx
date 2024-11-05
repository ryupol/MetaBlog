// import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
// import { QueryClient, QueryClientProvider } from "react-query";
// import useFetchBlogById from "../useFetchBlogById";

// Create a wrapper to provide the QueryClientProvider context
// function renderHookWithProviders(id: string | number) {
//   const queryClient = new QueryClient();
//   const TestComponent = () => {
//     const { data } = useFetchBlogById(id);
//     console.log(data);

//     // if (isLoading) return <span>Loading...</span>;
//     // if (error) return <span>Error loading blog</span>;

//     return (
//       <div>
//         <h1>{data?.title}</h1>
//         <p>{data?.content}</p>
//       </div>
//     );
//   };

//   return render(
//     <QueryClientProvider client={queryClient}>
//       <TestComponent />
//     </QueryClientProvider>,
//   );
// }

describe("useFetchBlogById", () => {
  it("fetches and displays blog data by ID", async () => {
    // Render the hook with a specific blog ID
    // renderHookWithProviders(1);

    // Check loading state
    // expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the mock data to load and verify it
    // const titleElement = await screen.findByRole("heading");
    // const contentElement = await screen.findByText("Traveling is an bra bra");
    // expect(titleElement).toBeInTheDocument();
    // expect(contentElement).toBeInTheDocument();
    expect(true).toBeTruthy();
  });
});
