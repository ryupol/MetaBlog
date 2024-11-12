import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  CardSkeleton,
  HomeContentSkeleton,
  UserMenuSkeleton,
  BlogContentSkeleton,
  HeaderSkeleton,
  EditCardSkeleton,
} from "../skeleton";

describe("Skeleton Components", () => {
  it("should render CardSkeleton", () => {
    render(<CardSkeleton />);
    expect(screen.getByTestId("card-skeleton")).toBeInTheDocument();
  });

  it("should render HomeContentSkeleton", () => {
    render(<HomeContentSkeleton />);
    expect(screen.getByTestId("home-content-skeleton")).toBeInTheDocument();
  });
  it("should render HeaderSkeleton", () => {
    render(<HeaderSkeleton />);
    expect(screen.getByTestId("header-skeleton")).toBeInTheDocument();
  });
  it("should render UserMenuSkeleton", () => {
    render(<UserMenuSkeleton />);
    expect(screen.getByTestId("user-menu-skeleton")).toBeInTheDocument();
  });
  it("should render EditCardSkeleton", () => {
    render(<EditCardSkeleton />);
    expect(screen.getByTestId("edit-card-skeleton")).toBeInTheDocument();
  });

  it("should render BlogContentSkeleton", () => {
    render(<BlogContentSkeleton />);
    expect(screen.getByTestId("blog-content-skeleton")).toBeInTheDocument();
  });
});
