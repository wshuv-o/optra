"use client";
import React from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "User Avatar", size = 40 }) => {
  return (
    <div className={`w-${size} h-${size} rounded-full overflow-hidden flex items-center justify-center bg-gray-300`}>
      {src ? (
        <Image src={src} alt={alt} width={size} height={size} className="rounded-full" />
      ) : (
        <span className="text-gray-600 text-lg">{alt.charAt(0)}</span>
      )}
    </div>
  );
};

export default Avatar;
