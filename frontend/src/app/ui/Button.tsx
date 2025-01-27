// Button.tsx
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  const baseStyle =
    "px-4 py-2 font-medium rounded-lg transition-colors focus:outline-none focus:ring";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300",
    outline: "border border-gray-500 text-gray-500 hover:bg-gray-100 focus:ring-gray-300",
  };
  const disabledStyle = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${disabled ? disabledStyle : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

