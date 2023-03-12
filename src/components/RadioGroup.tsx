"use client";
import React, { FC, useState } from "react";
import { sort } from "radash";

interface RadioOption {
  value: number;
  node?: React.ReactNode;
  label?: string;
}

interface IDivider {
  id: number;
  node: React.ReactNode;
}

interface RadioGroupProps {
  options: RadioOption[];
  defaultValue?: number;
  onChange?: (value: number) => void;
  columns?: number;
  center?: boolean;
  dividers?: IDivider[];
}

const RadioGroup: FC<RadioGroupProps> = ({
  options,
  defaultValue,
  onChange,
  columns = 2,
  center = true,
  dividers,
}) => {
  const [selectedValue, setSelectedValue] = useState<number>(
    defaultValue || options[0]?.value
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={`grid gap-x-4 gap-y-2 grid-cols-${columns}`}>
      {sort(options, (o) => o.value).map((option) => (
        <>
          <label
            key={option.value}
            className={`inline-flex w-full py-2 px-4 cursor-pointer border ${
              center ? "items-center" : "items-start"
            } rounded border-gray-300`}
          >
            <input
              type="radio"
              className={`form-radio h-8 w-8 valid:primary ${
                !center ? "mt-3" : ""
              } `}
              name="radio-group"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={handleChange}
            />
            {option.label ? (
              <span className="ml-3">{option.label}</span>
            ) : (
              option.node
            )}
          </label>
          {dividers &&
            dividers
              .filter((d) => d.id === option.value)
              .map((divider) => {
                return divider.node;
              })}
        </>
      ))}
    </div>
  );
};

export default RadioGroup;
