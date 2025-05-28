import React from "react";

export function Button({ children, onClick, variant = "default", size = "md", className }) {
  const base = "px-3 py-1 rounded text-white";
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700",
    destructive: "bg-red-600 hover:bg-red-700"
  };
  const sizes = {
    sm: "text-sm",
    md: "text-base"
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
}