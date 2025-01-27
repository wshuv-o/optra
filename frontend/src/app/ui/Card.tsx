// Card.tsx
import React from "react";

type CardProps = {
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="bg-white rounded-lg shadow p-4">{children}</div>;
};

export default Card;

