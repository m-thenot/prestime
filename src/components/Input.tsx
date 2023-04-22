import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrorsImpl } from "react-hook-form";

interface IInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  errors?: FieldErrorsImpl<any>;
}

const Input = React.forwardRef(
  (
    {
      label,
      name,
      type = "text",
      errors,
      ...props
    }: PropsWithChildren<IInputProps>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="mt-3 max-w-md w-full">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          ref={ref}
          id={name}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-200 focus:ring-primary-200 sm:text-sm ${
            errors?.[name!]
              ? "border-red-700 ring-red-700 focus:border-red-700"
              : ""
          }`}
          {...props}
        ></input>
        {errors && (
          <ErrorMessage
            errors={errors}
            name={name!}
            render={({ message }) => (
              <p className="text-xs text-red-700 mt-1">
                {message || "Ce champ est obligatoire."}
              </p>
            )}
          />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
