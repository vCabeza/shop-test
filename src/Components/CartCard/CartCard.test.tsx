import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CartCard from "./CartCard";

const phone = {
  id: "123",
  brand: "Google",
  name: "Pixel",
  basePrice: 100,
  imageUrl:
    "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp",
  selectedStorage: {
    capacity: "128GB",
    price: 100,
  },
  selectedColor: {
    hexCode: "#79736d",
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp",
    name: "Test Color",
  },
};
const deleteItem = jest.fn();

describe("CartCard", () => {
  it("renders", () => {
    render(<CartCard phone={phone} deleteItem={deleteItem} />);
    const phoneName = screen.getByText(/Pixel/i);
    expect(phoneName).toBeVisible();
  });

  it("calls deleteItem when button is clicked", () => {
    render(<CartCard phone={phone} deleteItem={deleteItem} />);
    const deleteButton = screen.getByText(/Eliminar/i);
    fireEvent.click(deleteButton);
    expect(deleteItem).toHaveBeenCalled();
  });
});
