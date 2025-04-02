import React from "react";
import classNames from "classnames";
import "./Button.css";

type ButtonProps = {
  value?: string;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
  extraHeight?: boolean;
  selectorButton?: boolean;
  colorButton?: boolean;
  selected?: boolean;
  customStyle?: React.CSSProperties;
  ariaLabel?: string;
};

const Button = (props: ButtonProps) => {
  const buttonClasses = classNames("button", {
    "button-primary": !props.disabled && props.primary,
    "button-disabled": props.disabled,
    "extra-height": props.extraHeight,
    "selector-button": props.selectorButton,
    "color-button": props.colorButton,
    "button-selected":
      (props.selectorButton || props.colorButton) && props.selected,
  });

  return (
    <button
      className={buttonClasses}
      onClick={props.onClick}
      style={props.customStyle && { ...props.customStyle }}
      disabled={props.disabled}
      aria-label={props.ariaLabel}
    >
      {props.value && props.value}
    </button>
  );
};

export default Button;
