import * as React from "react";
import * as cn from "./classNames";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn.inputWrapper()}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Input;
