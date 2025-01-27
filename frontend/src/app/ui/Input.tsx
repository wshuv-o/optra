// Input.tsx
import React from "react";

type InputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
      />
    </div>
  );
};

export default Input;
