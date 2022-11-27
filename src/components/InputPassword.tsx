import Eye from "@icons/Eye";
import EyeBar from "@icons/EyeBar";
import React from "react";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useState,
  PropsWithChildren,
} from "react";
import { FieldErrorsImpl } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";

type Input = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "ref"
>;

interface IInputPasswordProps extends Input {
  errors: FieldErrorsImpl<any>;
}

const InputPassword = React.forwardRef(
  (
    { errors, ...props }: PropsWithChildren<IInputPasswordProps>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    return (
      <div className="relative max-w-md w-full">
        <Input
          label="Mot de passe"
          autoComplete="password"
          type={isPasswordHidden ? "password" : "text"}
          errors={errors}
          ref={ref}
          {...props}
        />
        <Button
          variant="transparent"
          className="absolute right-1 top-11 h-6"
          onClick={() => setIsPasswordHidden((prev) => !prev)}
        >
          {isPasswordHidden ? <Eye /> : <EyeBar />}
        </Button>
      </div>
    );
  }
);

InputPassword.displayName = "InputPassword";

export default InputPassword;
