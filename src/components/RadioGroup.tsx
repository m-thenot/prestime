"use client";
import React, { FC, useState } from "react";
import { sort } from "radash";

interface RadioOption {
  label: string;
  value: number;
}

interface RadioGroupProps {
  options: RadioOption[];
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const RadioGroup: FC<RadioGroupProps> = ({
  options,
  defaultValue,
  onChange,
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
    <div className="grid gap-x-4 gap-y-2 grid-cols-2">
      {sort(options, (o) => o.value).map((option) => (
        <label
          key={option.value}
          className="inline-flex w-full items-center py-2 px-4 cursor-pointer border rounded border-gray-300"
        >
          <input
            type="radio"
            className="form-radio h-8 w-8 valid:primary"
            name="radio-group"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
          />
          <span className="ml-3">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
