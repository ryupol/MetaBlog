import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useRef } from "react";
import useClickOutside from "../useClickOutside";

function TestComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onOutsideClick);

  return (
    <div>
      <div ref={ref} data-testid="inside">
        Inside Element
      </div>
      <div data-testid="outside">Outside Element</div>
    </div>
  );
}

describe("useClickOutside", () => {
  it("calls callback when clicking outside of the referenced element", () => {
    const handleOutsideClick = vi.fn();
    const { getByTestId } = render(
      <TestComponent onOutsideClick={handleOutsideClick} />,
    );

    fireEvent.mouseDown(getByTestId("inside"));
    expect(handleOutsideClick).not.toHaveBeenCalled();

    fireEvent.mouseDown(getByTestId("outside"));
    expect(handleOutsideClick).toHaveBeenCalledTimes(1);
  });
});
