import * as React from "react";

import { cn } from "@utils/helpers";
import { useStyles } from "@hooks/useStyles";
import classNames from "classnames";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, ...props }, ref) => {
    const { stripTailwindClasses } = useStyles();

    const inputClasses = classNames(
      {
        [cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )]: !stripTailwindClasses,
      },
      "hm-input"
    );

    return (
      <input
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
