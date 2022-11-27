import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent";
}

const classnames = {
  primary: "bg-primary-100 text-white hover:bg-primary-200",
  secondary: "bg-white",
  transparent: "bg-transparent",
};

const Button: React.FC<IButtonProps> = ({
  children,
  variant = "primary",
  className,
  type,
  ...props
}) => {
  return (
    <button
      type={type || "button"}
      className={`${classnames[variant]} max-w-md rounded-lg px-4 font-semibold h-11 transition duration-200 ease-in-out ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
