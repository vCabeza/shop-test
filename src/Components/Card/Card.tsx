import React from "react";
import "./Card.css";
import { Phone } from "../../types";

type CardProps = {
  phone: Phone;
  onClick: () => void;
};

const Card = (props: CardProps) => {
  return (
    <div className="card-phone" onClick={props.onClick}>
      <img className="card-phone-image" src={props.phone.imageUrl} />
      <div className="card-phone-info">
        <div className="card-phone-brand-name">
          <div className="card-phone-brand">{props.phone.brand}</div>
          <div className="card-phone-name">{props.phone.name}</div>
        </div>
        <div className="card-phone-price">{`${props.phone.basePrice} EUR`}</div>
      </div>
    </div>
  );
};

export default Card;
