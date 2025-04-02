import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

const onClick = jest.fn();

describe("Button", () => {
  it("renders", () => {
    render(<Button onClick={onClick} value="Test Button" />);
    const testButton = screen.getByRole("button", { name: /Test Button/i });
    expect(testButton).toBeVisible();
  });

  it("calls function when clicked", () => {
    render(<Button onClick={onClick} value="Test Button" />);
    const testButton = screen.getByRole("button", { name: /Test Button/i });
    fireEvent.click(testButton);
    expect(onClick).toHaveBeenCalled();
  });

  it("adds button-selected class when selected", () => {
    render(
      <Button onClick={onClick} value="Test Button" selectorButton selected />
    );
    const testButton = screen.getByRole("button", { name: /Test Button/i });
    expect(testButton).toHaveClass("button-selected");
  });

  it("adds custom styles whe informed", () => {
    render(
      <Button
        onClick={onClick}
        value="Test Button"
        customStyle={{ width: 260 }}
      />
    );
    const testButton = screen.getByRole("button", { name: /Test Button/i });
    expect(testButton).toHaveStyle("width: 260px");
  });
});
