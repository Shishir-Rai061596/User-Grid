import { render } from "@testing-library/react";
import LoaderIcon from "./LoaderIcon";

describe("LoaderIcon Component", () => {
  it("renders loader icon", () => {
    const { container } = render(<LoaderIcon />);
    const loaderElement = container.querySelector(".loader");
    const loaderCircleElement = container.querySelector(".loader-circle");

    expect(loaderElement).toBeInTheDocument();
    expect(loaderCircleElement).toBeInTheDocument();
  });
});
