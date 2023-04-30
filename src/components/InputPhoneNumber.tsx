"use client";
import { Control, FieldErrorsImpl } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import colors from "tailwindcss/colors";
import { useUser } from "@contexts/user";

interface IInputPhoneNumberProps {
  control: Control<any, any>;
  errors?: FieldErrorsImpl<any>;
}

const InputPhoneNumber: React.FC<IInputPhoneNumberProps> = ({
  control,
  errors,
}) => {
  const { user } = useUser();

  return (
    <>
      <div className="mt-3 max-w-md w-full">
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Numéro de téléphone
        </label>
        <PhoneInputWithCountry
          defaultValue={user?.phone_number}
          defaultCountry="DJ"
          name="phoneNumber"
          control={control}
          className="phone-number-container"
          rules={{
            required: "Ce champ est obligatoire.",
            validate: isValidPhoneNumber,
          }}
        />
        {errors && (
          <ErrorMessage
            errors={errors}
            name="phoneNumber"
            render={({ message }) => (
              <p className="text-xs text-red-700 mt-1">
                {message || "Le format du numéro de téléphone est incorrect."}
              </p>
            )}
          />
        )}
      </div>
      <style jsx>
        {`
          :global(.PhoneInputInput) {
            border-color: ${errors?.phoneNumber
              ? colors.red[700]
              : colors.gray[300]};
          }
        `}
      </style>
    </>
  );
};

export default InputPhoneNumber;
