import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router";
import Carousel from "./Carousel";
import { Phone } from "../../types";
import { MemoryRouter } from "react-router";

const elements: Phone[] = [
  {
    id: "123",
    brand: "Google",
    name: "Pixel",
    basePrice: 100,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp",
  },
  {
    id: "456",
    brand: "Samsung",
    name: "Galaxy",
    basePrice: 200,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp",
  },
  {
    id: "789",
    brand: "Apple",
    name: "Iphone",
    basePrice: 1000,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp",
  },
];

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

describe("Carousel", () => {
  const mockedUseNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => mockedUseNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    render(
      <MemoryRouter>
        <Carousel title={"Carousel test"} elements={elements} />
      </MemoryRouter>
    );
    const carouselTitle = screen.getByText(/Carousel test/i);
    expect(carouselTitle).toBeVisible();
  });

  it("calls onNavigate when any card is clicked", () => {
    render(
      <MemoryRouter>
        <Carousel title={"Carousel test"} elements={elements} />
      </MemoryRouter>
    );

    const phoneName = screen.getByText(/Pixel/i);
    fireEvent.click(phoneName);

    expect(mockedUseNavigate).toHaveBeenCalled();
  });
});
