import React from "react";

export const Button: React.FC<React.JSX.IntrinsicElements["button"]> = ({
  children,
  className,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`px-3 py-2 rounded-lg text-white font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
