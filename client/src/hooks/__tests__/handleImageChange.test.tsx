import { describe, it, expect, vi } from "vitest";
import handleImageChange from "../handleImageChange";

describe("handleImageChange", () => {
  it("should call the setState function", async () => {
    const mockSetState = vi.fn(); // Create a mock function
    const fakeImg = new File([""], "image.png", { type: "image/png" });
    const event = {
      target: { files: [fakeImg] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleImageChange(event, mockSetState);

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        expect(mockSetState).toHaveBeenCalledWith(reader.result);
        resolve(true); // Resolve the promise when onloadend is called
      };
      reader.readAsDataURL(fakeImg); // Start reading the file
    });
  });

  it("should not call setState function when the file is empty", () => {
    const mockSetState = vi.fn();
    const event = {
      target: { files: [] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleImageChange(event, mockSetState);

    expect(mockSetState).not.toHaveBeenCalled();
  });
});
