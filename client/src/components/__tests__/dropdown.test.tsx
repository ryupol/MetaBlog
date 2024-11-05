import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DropDown from "../dropdown";

describe("DropDown Component", () => {
  const defaultProps = {
    defaultValue: "Select an option",
    allValues: ["Option 1", "Option 2", "Option 3"],
    onSelect: vi.fn(),
  };

  it("renders with default value", () => {
    render(<DropDown {...defaultProps} />);
    expect(screen.getByText(defaultProps.defaultValue)).toBeInTheDocument();
  });

  it("opens and closes the dropdown menu on button click", () => {
    render(<DropDown {...defaultProps} />);
    const dropdownButton = screen.getByRole("button");

    // Initially, the dropdown menu should be hidden
    expect(screen.queryByRole("list")).not.toBeInTheDocument();

    // Click button to open the dropdown
    fireEvent.click(dropdownButton);
    expect(screen.getByRole("list")).toBeInTheDocument();

    // Click button again to close the dropdown
    fireEvent.click(dropdownButton);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("selects an item and calls onSelect with correct value", () => {
    render(<DropDown {...defaultProps} />);
    const dropdownButton = screen.getByRole("button");

    // Click to open the dropdown
    fireEvent.click(dropdownButton);

    // Click value
    const option2 = screen.getByText("Option 2");
    fireEvent.click(option2);

    expect(dropdownButton).toHaveTextContent("Option 2");
    expect(defaultProps.onSelect).toHaveBeenCalledWith("Option 2");
  });

  it("closes dropdown when clicking outside", async () => {
    render(
      <div>
        <DropDown {...defaultProps} />
        <div data-testid="outside-div">Outside Area</div>
      </div>,
    );

    const dropdownButton = screen.getByRole("button");
    const outsideDiv = screen.getByTestId("outside-div");

    // Open the dropdown
    await waitFor(() => fireEvent.click(dropdownButton));
    expect(screen.getByRole("list")).toBeInTheDocument();

    // Click outside the dropdown
    await waitFor(() => fireEvent.mouseDown(outsideDiv));
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
