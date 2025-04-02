import React, { useEffect, useState } from "react";
import "./Cart.css";
import Button from "../../Components/Button/Button";
import CartCard from "../../Components/CartCard/CartCard";
import { useNavigate } from "react-router";
import { SelectedPhone } from "../../types";

type CartProps = {
  cartItems: SelectedPhone[];
  deleteItem: (item: SelectedPhone) => void;
};

const Cart = (props: CartProps) => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    let tempTotalPrice = 0;
    props.cartItems.forEach((element: SelectedPhone) => {
      tempTotalPrice += element.selectedStorage?.price ?? 0;
    });
    setTotalPrice(tempTotalPrice);
  }, [props.cartItems]);

  return (
    <div className="cart-container">
      <div className="cart-title">CART ({props.cartItems.length})</div>
      <div className="cart-elements">
        {props.cartItems.length > 0 &&
          props.cartItems.map((element: SelectedPhone, index: number) => (
            <CartCard
              phone={element}
              key={`${element.id}-${index}`}
              deleteItem={(item: SelectedPhone) => props.deleteItem(item)}
            />
          ))}
      </div>
      <div className="cart-footer-desktop">
        <Button
          onClick={() => navigate(`/`)}
          customStyle={{ width: 260 }}
          value="Continue Shopping"
          ariaLabel="continue-desktop"
        />
        <div className="cart-pay-info">
          <div className="cart-total-price">
            <div className="cart-total">TOTAL</div>
            <div className="cart-price">{totalPrice} EUR</div>
          </div>
          <Button
            onClick={() => {
              console.log("Pay");
            }}
            value="PAY"
            customStyle={{ width: 260 }}
            primary
          />
        </div>
      </div>
      <div className="cart-footer-mobile">
        <div className="cart-total-price">
          <div className="cart-total">TOTAL</div>
          <div className="cart-price">{totalPrice} EUR</div>
        </div>

        <div className="buttons-container">
          <Button
            onClick={() => navigate(`/`)}
            customStyle={{ width: 260 }}
            value="Continue Shopping"
            ariaLabel="continue-mobile"
          />

          <Button
            onClick={() => {
              console.log("Pay");
            }}
            value="PAY"
            customStyle={{ width: 260 }}
            primary
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
