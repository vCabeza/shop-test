import React from "react";
import { render, screen } from "@testing-library/react";
import List from "./List";

const specsList = [
  { title: "spec1", description: "This is spec number 1" },
  { title: "spec2", description: "This is spec number 2" },
  { title: "spec3", description: "This is spec number 3" },
  { title: "spec4", description: "This is spec number 4" },
  { title: "spec5", description: "This is spec number 5" },
  { title: "spec6", description: "This is spec number 6" },
];

describe("List", () => {
  it("renders", () => {
    render(<List title={"List Test"} list={specsList} />);
    const listTitle = screen.getByText(/list test/i);
    expect(listTitle).toBeVisible();
  });

  it("renders the specs list", () => {
    render(<List title={"List Test"} list={specsList} />);
    const specOne = screen.getByText(/spec1/i);
    expect(specOne).toBeVisible();

    const specFour = screen.getByText(/spec4/i);
    expect(specFour).toBeVisible();

    const specSix = screen.getByText(/spec6/i);
    expect(specSix).toBeVisible();
  });
});
