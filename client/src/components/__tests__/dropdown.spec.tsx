import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DropDown from "../dropdown";

describe("DropDown Component", () => {
  const defaultProps = {
    defaultValue: "Select an option",
    allValues: ["Option 1", "Option 2", "Option 3"],
    onSelect: jest.fn(),
  };

  test("renders with default value", () => {
    render(<DropDown {...defaultProps} />);
    expect(screen.getByText(defaultProps.defaultValue)).toBeInTheDocument();
  });

  test("opens and closes the dropdown menu on button click", async () => {
    render(<DropDown {...defaultProps} />);
    const dropdownButton = screen.getByRole("button");

    // Initially, the dropdown menu should be hidden
    expect(screen.queryByRole("list")).not.toBeInTheDocument();

    // Click button to open the dropdown
    await userEvent.click(dropdownButton);
    expect(screen.getByRole("list")).toBeInTheDocument();

    // Click button again to close the dropdown
    await userEvent.click(dropdownButton);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("selects an item and calls onSelect with correct value", async () => {
    render(<DropDown {...defaultProps} />);
    const dropdownButton = screen.getByRole("button");

    // Open the dropdown
    await userEvent.click(dropdownButton);

    // Select an item
    const option2 = screen.getByText("Option 2");
    await userEvent.click(option2);

    // Check if the selected item updates the button text
    expect(dropdownButton).toHaveTextContent("Option 2");
    expect(defaultProps.onSelect).toHaveBeenCalledWith("Option 2");
  });

  test("closes dropdown when clicking outside", async () => {
    render(
      <div>
        <DropDown {...defaultProps} />
        <div data-testid="outside-div">Outside Area</div>
      </div>,
    );
    const dropdownButton = screen.getByRole("button");

    // Open the dropdown
    await userEvent.click(dropdownButton);
    expect(screen.getByRole("list")).toBeInTheDocument();

    // Click outside the dropdown
    const outsideDiv = screen.getByTestId("outside-div");
    await userEvent.click(outsideDiv);

    // Check if the dropdown is closed
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
