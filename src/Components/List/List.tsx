import React from "react";
import "./List.css";
import { ListElement } from "../../types";

type ListProps = {
  title: string;
  list: ListElement[]; // Un array de objetos tipo `Element`
};

const List = (props: ListProps) => {
  return (
    <div className="list-container">
      <div className="list-title">{props.title}</div>
      <div className="list">
        {props.list &&
          props.list.map((element: ListElement, index: number) => (
            <div
              className="element"
              key={`${element.title}-${element.description}-${index}`}
            >
              <div className="element-title">{element.title}</div>
              <div className="element-description">{element.description}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default List;
