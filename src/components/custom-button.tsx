import React from "react";

export const CustomButton = ({
  onClick,
  children,
  ...rest
}: {
  onClick: () => void;
  children: React.ReactNode;
  [x: string]: any;
}) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex h-8 px-7 justify-center items-center gap-10 flex-shrink-0 rounded-md border-2 border-teal-400 bg-gray-300 bg-opacity-25"
      {...rest}
    >
      {children}
    </button>
  );
};
