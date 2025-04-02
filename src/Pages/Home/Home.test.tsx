import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { useNavigate } from "react-router";
import Home from "./Home";
import { Phone } from "../../types";

const mockedPhonesList: Phone[] = [
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

describe("Home", () => {
  const mockedUseNavigate = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(global, "fetch")
      // @ts-ignore: Unreachable code error
      .mockResolvedValue({
        ok: true,
        status: 200,
        statusText: "OK",
        json: jest.fn().mockResolvedValue(mockedPhonesList),
      });
    (useNavigate as jest.Mock).mockImplementation(() => mockedUseNavigate);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders", async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      )
    );

    const phoneText = screen.getByText(/Google/i);
    expect(phoneText).toBeVisible();
  });

  it("calls fetch when searchbar value is modified", async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      )
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const searchBar = screen.getByRole("textbox", {
      name: /textfield/i,
    });
    fireEvent.change(searchBar, { target: { value: "Apple" } });

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("calls onNavigate when any card is clicked", async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      )
    );

    const phoneText = screen.getByText(/Google/i);
    fireEvent.click(phoneText);

    expect(mockedUseNavigate).toHaveBeenCalled();
  });
});
