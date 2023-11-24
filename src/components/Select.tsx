import theme from "constants/theme";
import React from "react";
import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  OptionsOrGroups,
} from "react-select";
import colors from "tailwindcss/colors";

interface ISelectProps {
  options?: OptionsOrGroups<any, GroupBase<any>>;
  label?: string;
  placeholder?: string;
  isClearable?: boolean;
  required?: boolean;
  value?: any;
  onChange?:
    | ((newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => void)
    | undefined;
}

const CustomSelect: React.FC<ISelectProps> = ({
  label,
  placeholder = "",
  isClearable = true,
  required,
  options,
  value,
  onChange,
}) => {
  return (
    <>
      <div className="select w-full mt-3 max-w-md">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <Select
          options={options}
          placeholder={placeholder}
          isClearable={isClearable}
          value={value}
          onChange={onChange}
          isMulti
          required={required}
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
      <style jsx>
        {`
          .select :global(input) {
            box-shadow: none !important;
          }
        `}
      </style>
    </>
  );
};

export default CustomSelect;
