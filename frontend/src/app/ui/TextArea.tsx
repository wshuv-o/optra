
// Textarea.tsx
import React from "react";

type TextareaProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
};

const Textarea: React.FC<TextareaProps> = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        rows={4}
      ></textarea>
    </div>
  );
};

export default Textarea;