// CardContent.tsx
import React from "react";

type CardContentProps = {
  children: React.ReactNode;
};

const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export default CardContent;

