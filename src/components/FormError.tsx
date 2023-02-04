import React from "react";

interface IFormErrorProps {
  errorMessage: string;
  className?: string;
}

const FormError: React.FC<IFormErrorProps> = ({ className, errorMessage }) => {
  return (
    <div
      className={`bg-red-100 py-2 w-full max-w-md rounded mt-3 mb-2 text-center ${className}`}
    >
      <p className="text-red-700">{errorMessage}</p>
    </div>
  );
};

export default FormError;
