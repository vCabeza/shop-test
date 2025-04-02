import React from "react";
import "./CartCard.css";
import { SelectedPhone } from "../../types";

type CartCardProps = {
  phone: SelectedPhone;
  deleteItem: (phone: SelectedPhone) => void;
};

const CartCard = (props: CartCardProps) => {
  return (
    <div className="cart-card-container">
      <img
        className="cart-card-image"
        src={props.phone.selectedColor.imageUrl}
      />
      <div className="cart-card-body">
        <div className="cart-card-info">
          <div className="cart-card-header">
            <div className="cart-card-name">{props.phone.name}</div>
            <div className="cart-card-name">{`${props.phone.selectedStorage.capacity} | ${props.phone.selectedColor.name}`}</div>
          </div>
          <div className="cart-card-price">{`${props.phone.selectedStorage.price} EUR`}</div>
        </div>
        <div
          className="cart-card-delete"
          onClick={() => props.deleteItem(props.phone)}
        >
          Eliminar
        </div>
      </div>
    </div>
  );
};

export default CartCard;
