import React from "react";
import { render, screen } from "@testing-library/react";
import Selector from "./Selector";

const selectorOptions = [
  <div>First Option</div>,
  <div>Second Option</div>,
  <div>Third Option</div>,
];

describe("Selector", () => {
  it("renders", () => {
    render(<Selector label={"Test Selector"} options={selectorOptions} />);
    const listTitle = screen.getByText(/Test Selector/i);
    expect(listTitle).toBeVisible();
  });

  it("renders the specs list", () => {
    render(<Selector label={"Test Selector"} options={selectorOptions} />);
    const firstOption = screen.getByText(/First Option/i);
    expect(firstOption).toBeVisible();

    const secondOption = screen.getByText(/Second Option/i);
    expect(secondOption).toBeVisible();

    const thirdOption = screen.getByText(/Third Option/i);
    expect(thirdOption).toBeVisible();
  });
});
