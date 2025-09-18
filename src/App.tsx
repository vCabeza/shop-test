import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import "./App.css";
import Logo from "./Images/logo.png";
import BagActive from "./Images/bag-icon-active.png";
import Cart from "./Pages/Cart/Cart";
import { SelectedPhone } from "./types";

export const API_URL =
  "https://prueba-tecnica-api-tienda-moviles.onrender.com/products";
export const API_KEY = "87909682e6cd74208f41a6ef39fe4191";

function App() {
  const [cartItems, setCartItems] = useState<SelectedPhone[]>([]);
  const navigate = useNavigate();

  function addItem(item: SelectedPhone) {
    const tempCartItems: SelectedPhone[] = [...cartItems];
    tempCartItems.push(item);
    setCartItems(tempCartItems);
  }

  function deleteItem(item: SelectedPhone) {
    const tempCartItems: SelectedPhone[] = [...cartItems];
    const index = tempCartItems.findIndex(
      (element) =>
        element.name === item.name &&
        element.selectedStorage.capacity === item.selectedStorage.capacity &&
        element.selectedColor.name === item.selectedColor.name
    );
    tempCartItems.splice(index, 1);
    setCartItems(tempCartItems);
  }

  return (
    <div className="App">
      <div className="header">
        <img
          className="logo"
          aria-label="logo"
          src={Logo}
          onClick={() => navigate(`/`)}
        />
        <div className="cart">
          <img
            className="cart-icon"
            aria-label="cart-button"
            src={BagActive}
            onClick={() => navigate(`/cart`)}
          />{" "}
          <div aria-label="items-in-cart">{cartItems.length}</div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/details/:phoneId"
          element={<Details addItem={(item: SelectedPhone) => addItem(item)} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              deleteItem={(item: SelectedPhone) => deleteItem(item)}
              priceStrategy="default"
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
