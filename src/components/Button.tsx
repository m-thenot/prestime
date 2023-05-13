import Link from "next/link";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import Loader from "./Loader";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "link" | "none";
  isLoading?: boolean;
  hasMinWidth?: boolean;
}

interface ILinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "link" | "none";
  hasMinWidth?: boolean;
  className?: string;
}

const classnames = {
  primary:
    "bg-primary-100 text-white hover:bg-primary-200 px-4 font-semibold h-11 disabled:opacity-75",
  secondary: "bg-white text-primary-100 border border-primary-100 px-4  h-11",
  transparent: "bg-transparent px-4 font-semibold",
  link: "bg-transparent h-auto px-0 hover:opacity-50 text-left",
  none: "",
};

const Button: React.FC<IButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  hasMinWidth = false,
  type,
  isLoading = false,
  ...props
}) => {
  return (
    <button
      type={type || "button"}
      className={`max-w-md rounded-lg transition duration-200 ease-in-out ${
        classnames[variant]
      } ${hasMinWidth ? "min-w-[220px]" : ""}  ${className}`}
      {...props}
    >
      {!isLoading ? children : <Loader />}
    </button>
  );
};

export const LinkButton: React.FC<ILinkButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  hasMinWidth = false,
  href,
}) => {
  return (
    <Link
      href={href}
      className={`max-w-md rounded-lg flex items-center justify-center !no-underline	transition duration-200 ease-in-out ${
        classnames[variant]
      } ${hasMinWidth ? "min-w-[220px]" : ""}  ${className}`}
    >
      {children}
    </Link>
  );
};

export default Button;
