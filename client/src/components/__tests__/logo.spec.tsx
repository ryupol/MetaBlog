import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Logo from "../logo";
import blackLogo from "../assets/black-logo.svg";
import whiteLogo from "../assets/white-logo.svg";
import { useSelector } from "react-redux";

// Mock Logo, assuming they have been imported
jest.mock("../logo", () => () => useSelector);

describe("Logo Component", () => {
  it("renders with light theme", () => {
    expect(screen.getByRole("img")).toHaveAttribute("src", blackLogo);
    expect(screen.getByText("MetaBlog")).toBeInTheDocument();
    expect(screen.queryByText("JS Template")).toBeNull(); // footer text should not be visible
  });

  it("renders with dark theme", () => {
    const store = mockStore({
      theme: { theme: "dark" },
    });

    renderWithStore(store);

    expect(screen.getByRole("img")).toHaveAttribute("src", whiteLogo);
    expect(screen.getByText("MetaBlog")).toHaveClass("text-white");
    expect(screen.queryByText("JS Template")).toBeNull(); // footer text should not be visible
  });

  it("renders footer version with light theme", () => {
    const store = mockStore({
      theme: { theme: "light" },
    });

    render(
      <Provider store={store}>
        <Logo footer={true} />
      </Provider>,
    );

    expect(screen.getByRole("img")).toHaveAttribute("src", blackLogo);
    expect(screen.getByText("JS Template")).toBeInTheDocument(); // footer text should be visible
  });

  it("renders footer version with dark theme", () => {
    const store = mockStore({
      theme: { theme: "dark" },
    });

    render(
      <Provider store={store}>
        <Logo footer={true} />
      </Provider>,
    );

    expect(screen.getByRole("img")).toHaveAttribute("src", whiteLogo);
    expect(screen.getByText("JS Template")).toBeInTheDocument(); // footer text should be visible
  });

  it("renders with dark theme when signForm prop is true, overriding store theme", () => {
    const store = mockStore({
      theme: { theme: "light" },
    });

    render(
      <Provider store={store}>
        <Logo signForm={true} />
      </Provider>,
    );

    expect(screen.getByRole("img")).toHaveAttribute("src", whiteLogo); // should render dark theme image
    expect(screen.getByText("MetaBlog")).toHaveClass("text-white");
  });
});
