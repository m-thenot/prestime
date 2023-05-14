import theme from "constants/theme";
import React from "react";
import Select from "react-select";
import colors from "tailwindcss/colors";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

interface ISelectProps {
  label?: string;
  placeholder?: string;
  isClearable?: boolean;
}

const CustomSelect: React.FC<ISelectProps> = ({
  label,
  placeholder = "",
  isClearable = true,
}) => {
  return (
    <div className="w-full mt-3 max-w-md">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Select
        options={options}
        placeholder={placeholder}
        isClearable={isClearable}
        theme={(selectTheme) => ({
          ...selectTheme,
          borderRadius: 6,
          colors: {
            ...selectTheme.colors,
            primary: theme.colors.primary[200],
            primary50: colors.slate[100],
            primary25: colors.slate[100],
            primary75: colors.slate[100],
          },
        })}
      />
    </div>
  );
};

export default CustomSelect;
