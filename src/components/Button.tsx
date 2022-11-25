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
  primary: "bg-primary-100 text-white",
  secondary: "bg-white",
  transparent: "bg-transparent",
};

const Button: React.FC<IButtonProps> = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  return (
    <button
      className={`${classnames[variant]} rounded-lg px-4 font-semibold h-11 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
