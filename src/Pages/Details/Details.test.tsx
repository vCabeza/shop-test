import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Details from "./Details";
import { mockedPhoneData } from "./MockPhoneData";

const addItem = jest.fn();

describe("Details", () => {
  beforeEach(() => {
    jest
      .spyOn(global, "fetch")
      // @ts-ignore: Unreachable code error
      .mockResolvedValue({
        ok: true,
        status: 200,
        statusText: "OK",
        json: jest.fn().mockResolvedValue(mockedPhoneData),
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders", async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Details addItem={addItem} />
        </MemoryRouter>
      )
    );
    const detailsTitle = screen.getByLabelText(/details-title/i);
    expect(detailsTitle).toBeVisible();
  });

  /*it("shows an error when call fails", async () => {
    jest
      .spyOn(global, "fetch")
      // @ts-ignore: Unreachable code error
      .mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: "Server Error" }),
      });

    await act(async () =>
      render(
        <MemoryRouter>
          <Details addItem={addItem} />
        </MemoryRouter>
      )
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error al obtener los teléfonos"
      );
    });
  });*/

  it("changes storage when different storage is clicked", async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Details addItem={addItem} />
        </MemoryRouter>
      )
    );

    expect(screen.getByText(/from 459 eur/i)).toBeVisible();

    const storageButton = screen.getByRole("button", { name: /256 gb/i });
    expect(storageButton).not.toHaveClass("button-selected");
    fireEvent.click(storageButton);

    expect(screen.getByText(/from 509 eur/i)).toBeVisible();
    expect(storageButton).toHaveClass("button-selected");
  });

  it("changes color when different color is clicked", async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Details addItem={addItem} />
        </MemoryRouter>
      )
    );

    const detailsPhoneImage = screen.getByRole("img", {
      name: /Details phone image/i,
    });
    expect(detailsPhoneImage).toHaveAttribute(
      "src",
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp"
    );

    const colorButtton = screen.getByRole("button", {
      name: /color-button-#F5F5F5/i,
    });
    expect(colorButtton).not.toHaveClass("button-selected");
    fireEvent.click(colorButtton);

    expect(detailsPhoneImage).toHaveAttribute(
      "src",
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-porcelana.webp"
    );
    expect(colorButtton).toHaveClass("button-selected");
  });

  it("doesn't call addItem before select storage and color", async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Details addItem={addItem} />
        </MemoryRouter>
      )
    );

    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addButton);

    expect(addButton).toBeDisabled();
    expect(addItem).not.toHaveBeenCalled();
  });

  it("calls addItem after storage and color are selected", async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Details addItem={addItem} />
        </MemoryRouter>
      )
    );

    const storageButton = screen.getByRole("button", { name: /256 gb/i });
    fireEvent.click(storageButton);

    const colorButtton = screen.getByRole("button", {
      name: /color-button-#F5F5F5/i,
    });
    fireEvent.click(colorButtton);

    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addButton);

    expect(addButton).not.toBeDisabled();
    expect(addItem).toHaveBeenCalled();
  });
});
