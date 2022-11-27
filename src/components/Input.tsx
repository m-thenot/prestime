import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface IInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

const Input: React.FC<IInputProps> = ({ label, name, type = "text" }) => {
  return (
    <div className="mt-3 max-w-md w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-200 focus:ring-primary-200 sm:text-sm"
      ></input>
    </div>
  );
};

export default Input;
