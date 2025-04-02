import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router";
import { SelectedPhone } from "./types";

jest.mock("./Pages/Home/Home", () => ({
  __esModule: true,
  default: () => <div data-testid="HomePageMock" />,
}));

jest.mock("./Pages/Details/Details", () => ({
  __esModule: true,
  default: (props: { addItem: (selectedItem: SelectedPhone) => void }) => (
    <div data-testid="DetailsPageMock">
      <button
        onClick={() =>
          props.addItem({
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
          })
        }
      >
        Add Item
      </button>
    </div>
  ),
}));

jest.mock("./Pages/Cart/Cart", () => ({
  __esModule: true,
  default: (props: { deleteItem: (selectedItem: SelectedPhone) => void }) => (
    <div data-testid="CartPageMock">
      <button
        onClick={() =>
          props.deleteItem({
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
          })
        }
      >
        Delete Item
      </button>
    </div>
  ),
}));

describe("App", () => {
  it("renders", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const homeButton = screen.getByRole("img", { name: /logo/i });
    expect(homeButton).toBeInTheDocument();
    expect(screen.getByTestId("HomePageMock")).toBeInTheDocument();
  });

  it("adds a new item to cart", () => {
    render(
      <MemoryRouter initialEntries={["/details/SMG-S24U"]}>
        <App />
      </MemoryRouter>
    );

    const cartLabel = screen.getByLabelText(/items-in-cart/i);
    expect(within(cartLabel).getByText(/0/i)).toBeInTheDocument();

    const addButton = screen.getByRole("button", { name: /add item/i });
    fireEvent.click(addButton);

    expect(within(cartLabel).getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByTestId("DetailsPageMock")).toBeInTheDocument();
  });

  it("deletes item from cart", () => {
    render(
      <MemoryRouter initialEntries={["/details/SMG-S24U"]}>
        <App />
      </MemoryRouter>
    );

    const cartLabel = screen.getByLabelText(/items-in-cart/i);

    const addButton = screen.getByRole("button", { name: /add item/i });
    fireEvent.click(addButton);

    expect(within(cartLabel).getByText(/1/i)).toBeInTheDocument();

    const cartButton = screen.getByRole("img", { name: /cart-button/i });
    fireEvent.click(cartButton);

    const deleteButton = screen.getByText(/Delete Item/i);
    fireEvent.click(deleteButton);

    expect(within(cartLabel).getByText(/0/i)).toBeInTheDocument();
  });

  it("navigates to home when logo is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("HomePageMock")).not.toBeInTheDocument();

    const logoButton = screen.getByRole("img", {
      name: /logo/i,
    });
    fireEvent.click(logoButton);

    expect(screen.getByTestId("HomePageMock")).toBeInTheDocument();
  });
});
