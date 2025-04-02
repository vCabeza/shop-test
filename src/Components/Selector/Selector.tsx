import React from "react";
import classNames from "classnames";
import "./Selector.css";

type SelectorProps = {
  label: string;
  options: React.ReactNode[];
  addGap?: boolean;
};

const Selector = (props: SelectorProps) => {
  const selectorClasses = classNames("selector-options", {
    "selector-gap": props.addGap,
  });

  return (
    <div className="selector-container">
      <div className="selector-label">{props.label}</div>
      <div className={selectorClasses}>
        {props.options &&
          props.options.map((option: React.ReactNode) => option)}
      </div>
    </div>
  );
};

export default Selector;
