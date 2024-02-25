import React from "react";
import { LoadingSpinner } from "./loading-spinner";

export const CustomButton = ({
  onClick,
  children,
  isLoading,
  ...rest
}: {
  onClick: () => void;
  children: React.ReactNode;
  [x: string]: any;
  isLoading?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center h-8 px-4 py-4 flex-shrink-0 rounded-md border-2 border-teal-400 bg-gray-300 bg-opacity-25"
      {...rest}
    >
      {isLoading ? (
        <div className="ml-2">
          <LoadingSpinner size={20} color="white" />
        </div>
      ) : null}
      <div>{children}</div>
    </button>
  );
};
