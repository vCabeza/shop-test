import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router";
import Cart from "./Cart";
import { MemoryRouter } from "react-router";

const phonesList = [
  {
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
      name: "Pixel Color",
    },
  },
  {
    id: "456",
    brand: "Samsung",
    name: "Galaxy",
    basePrice: 200,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp",
    selectedStorage: {
      capacity: "256GB",
      price: 200,
    },
    selectedColor: {
      hexCode: "#79736d",
      imageUrl:
        "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp",
      name: "Galaxy Color",
    },
  },
  {
    id: "789",
    brand: "Apple",
    name: "Iphone",
    basePrice: 1000,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp",
    selectedStorage: {
      capacity: "512GB",
      price: 1000,
    },
    selectedColor: {
      hexCode: "#79736d",
      imageUrl:
        "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp",
      name: "Iphone Color",
    },
  },
];

const deleteItem = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

describe("Cart", () => {
  const mockedUseNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => mockedUseNavigate);
  });

  it("renders", () => {
    render(
      <MemoryRouter>
        <Cart
          cartItems={phonesList}
          deleteItem={deleteItem}
          priceStrategy="default"
        />
      </MemoryRouter>
    );
    const cartText = screen.getByText(/cart/i);
    expect(cartText).toBeVisible();
  });

  it("it shows empty card when no element is added", () => {
    render(
      <MemoryRouter>
        <Cart cartItems={[]} deleteItem={deleteItem} priceStrategy="default" />
      </MemoryRouter>
    );
    const cartText = screen.getByText(/Your cart is empty/i);
    expect(cartText).toBeVisible();
  });

  it("renders cart items", () => {
    render(
      <MemoryRouter>
        <Cart
          cartItems={phonesList}
          deleteItem={deleteItem}
          priceStrategy="default"
        />
      </MemoryRouter>
    );

    const phoneOne = screen.getAllByText(/pixel/i);
    expect(phoneOne[0]).toBeVisible();

    const phoneTwo = screen.getAllByText(/galaxy/i);
    expect(phoneTwo[0]).toBeVisible();

    const phoneThree = screen.getAllByText(/iphone/i);
    expect(phoneThree[0]).toBeVisible();
  });

  it("calculates default total price correctly", async () => {
    render(
      <MemoryRouter>
        <Cart
          cartItems={phonesList}
          deleteItem={deleteItem}
          priceStrategy="default"
        />
      </MemoryRouter>
    );

    const totalPrice = screen.getAllByText(/1300 EUR/i);
    expect(totalPrice[0]).toBeVisible();
  });

  it("calculates withDiscount total price correctly", async () => {
    render(
      <MemoryRouter>
        <Cart
          cartItems={phonesList}
          deleteItem={deleteItem}
          priceStrategy="withDiscount"
        />
      </MemoryRouter>
    );

    const totalPrice = screen.getAllByText(/1170 EUR/i);
    expect(totalPrice[0]).toBeVisible();
  });

  it("calculates withTax total price correctly", async () => {
    render(
      <MemoryRouter>
        <Cart
          cartItems={phonesList}
          deleteItem={deleteItem}
          priceStrategy="withTax"
        />
      </MemoryRouter>
    );

    const totalPrice = screen.getAllByText(/1573 EUR/i);
    expect(totalPrice[0]).toBeVisible();
  });

  it("calls deleteItem function when button is clicked", () => {
    render(
      <MemoryRouter>
        <Cart
          cartItems={phonesList}
          deleteItem={deleteItem}
          priceStrategy="default"
        />
      </MemoryRouter>
    );

    const deleteButton = screen.getAllByText(/Eliminar/i);
    fireEvent.click(deleteButton[0]);
    expect(deleteItem).toHaveBeenCalledWith({
      basePrice: 100,
      brand: "Google",
      id: "123",
      imageUrl:
        "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp",
      name: "Pixel",
      selectedColor: {
        hexCode: "#79736d",
        imageUrl:
          "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp",
        name: "Pixel Color",
      },
      selectedStorage: { capacity: "128GB", price: 100 },
    });
  });

  it("redirects user to home if continue shopping button is clicked desktop", async () => {
    render(
      <MemoryRouter>
        <Cart
          cartItems={phonesList}
          deleteItem={deleteItem}
          priceStrategy="default"
        />
      </MemoryRouter>
    );

    const continueShoppingButton = screen.getByRole("button", {
      name: /continue-desktop/i,
      hidden: true,
    });
    fireEvent.click(continueShoppingButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith("/");
  });

  it("redirects user to home if continue shopping button is clicked mobile", async () => {
    render(
      <MemoryRouter>
        <Cart
          cartItems={phonesList}
          deleteItem={deleteItem}
          priceStrategy="default"
        />
      </MemoryRouter>
    );

    const continueShoppingButton = screen.getByRole("button", {
      name: /continue-mobile/i,
      hidden: true,
    });
    fireEvent.click(continueShoppingButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith("/");
  });
});
