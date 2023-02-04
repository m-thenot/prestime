import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import Loader from "./Loader";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "link";
  isLoading?: boolean;
}

const classnames = {
  primary: "bg-primary-100 text-white hover:bg-primary-200",
  secondary: "bg-white",
  transparent: "bg-transparent",
  link: "bg-transparent h-auto px-0 hover:opacity-50 text-left",
};

const Button: React.FC<IButtonProps> = ({
  children,
  variant = "primary",
  className,
  type,
  isLoading = false,
  ...props
}) => {
  return (
    <button
      type={type || "button"}
      className={`max-w-md rounded-lg px-4 font-semibold h-11 transition duration-200 ease-in-out ${classnames[variant]}  ${className}`}
      {...props}
    >
      {!isLoading ? children : <Loader />}
    </button>
  );
};

export default Button;
