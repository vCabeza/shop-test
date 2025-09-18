import React, { useMemo } from "react";
import "./Cart.css";
import Button from "../../Components/Button/Button";
import CartCard from "../../Components/CartCard/CartCard";
import { useNavigate } from "react-router";
import { SelectedPhone } from "../../types";

type PriceStrategy = "default" | "withDiscount" | "withTax";

type CartProps = {
  cartItems: SelectedPhone[];
  deleteItem: (item: SelectedPhone) => void;
  priceStrategy: PriceStrategy;
};

const priceStrategies = {
  default: (items: SelectedPhone[]) =>
    items.reduce((acc, item) => acc + (item.selectedStorage?.price ?? 0), 0),
  withDiscount: (items: SelectedPhone[]) =>
    items.reduce((acc, item) => acc + (item.selectedStorage?.price ?? 0), 0) *
    0.9,
  withTax: (items: SelectedPhone[]) =>
    items.reduce((acc, item) => acc + (item.selectedStorage?.price ?? 0), 0) *
    1.21,
};

export function useCartTotal(
  cartItems: SelectedPhone[],
  strategy: PriceStrategy
) {
  return useMemo(
    () => priceStrategies[strategy](cartItems),
    [cartItems, strategy]
  );
}

const Cart = (props: CartProps) => {
  const navigate = useNavigate();
  const totalPrice = useCartTotal(props.cartItems, props.priceStrategy);

  const handleContinue = () => navigate(`/`);
  const handlePay = () => {
    console.log("Processing payment...");
  };

  return (
    <div className="cart-container">
      <div className="cart-title">CART ({props.cartItems.length})</div>
      <div className="cart-elements">
        {props.cartItems.length > 0 ? (
          props.cartItems.map((element: SelectedPhone, index: number) => (
            <CartCard
              phone={element}
              key={`${element.id}-${index}`}
              deleteItem={(item: SelectedPhone) => props.deleteItem(item)}
            />
          ))
        ) : (
          <div className="cart-empty">Your cart is empty</div>
        )}
      </div>
      <div className="cart-footer-desktop">
        <Button
          onClick={handleContinue}
          customStyle={{ width: 260 }}
          value="Continue Shopping"
          ariaLabel="continue-desktop"
        />
        <div className="cart-pay-info">
          <div className="cart-total-price">
            <div className="cart-total">TOTAL</div>
            <div className="cart-price">{`${totalPrice} EUR`}</div>
          </div>
          <Button
            onClick={handlePay}
            value="PAY"
            customStyle={{ width: 260 }}
            primary
          />
        </div>
      </div>
      <div className="cart-footer-mobile">
        <div className="cart-total-price">
          <div className="cart-total">TOTAL</div>
          <div className="cart-price">{`${totalPrice} EUR`}</div>
        </div>

        <div className="buttons-container">
          <Button
            onClick={handleContinue}
            customStyle={{ width: 260 }}
            value="Continue Shopping"
            ariaLabel="continue-mobile"
          />

          <Button
            onClick={handlePay}
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
