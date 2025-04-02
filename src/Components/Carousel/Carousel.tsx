import React from "react";
import "./Carousel.css";
import Card from "../Card/Card";
import { useNavigate } from "react-router";
import { Phone } from "../../types";

type CarouselProps = {
  title: string;
  elements: Phone[];
};

const Carousel = (props: CarouselProps) => {
  const navigate = useNavigate();

  return (
    <div className="carousel-container">
      <div className="carousel-title">{props.title}</div>
      <div className="carousel-list">
        {props.elements &&
          props.elements.map((element: Phone, index: number) => (
            <Card
              phone={element}
              key={`${element.id}-${index}`}
              onClick={() => navigate(`/details/${element.id}`)}
            />
          ))}
      </div>
    </div>
  );
};

export default Carousel;
