import React from 'react';

interface AuthTitleProps {
  text?: string;
}

export const AuthTitle: React.FC<AuthTitleProps> = ({ text = "Movement Brand" }) => {
  return (
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
      {text}
    </h1>
  );
};