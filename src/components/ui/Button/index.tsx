import React from "react";
import "./Button.scss";
import { classNames } from "uixtra/utils";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  label?: React.ReactNode;
  labelClassName?: string;
}

export const BrushMaskButton: React.FC<ButtonProps> = (props) => {
  const { label, labelClassName, className, ...restProps } = props;
  return (
    <div className={classNames("custom-button", "brush-mask-button")}>
      <span className={classNames("label", labelClassName)}>{label}</span>
      <button className={className} {...restProps}>
        {label}
      </button>
    </div>
  );
};
