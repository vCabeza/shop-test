import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./Card";
import { Phone } from "../../types";

const openDetail = jest.fn();
const phone: Phone = {
  id: "123",
  brand: "Google",
  name: "Pixel",
  basePrice: 100,
  imageUrl:
    "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp",
};

describe("Card", () => {
  it("renders", () => {
    render(<Card phone={phone} onClick={openDetail} />);

    const phoneName = screen.getByText(/Pixel/i);
    expect(phoneName).toBeVisible();
  });
  it("calls openDetail function when card is clicked", () => {
    render(<Card phone={phone} onClick={openDetail} />);

    const phoneName = screen.getByText(/Pixel/i);
    fireEvent.click(phoneName);

    expect(openDetail).toHaveBeenCalled();
  });
});
