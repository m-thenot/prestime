"use client";
import React, { FC, Fragment, useEffect, useState } from "react";
import { sort } from "radash";

interface RadioOption {
  value: number | string;
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
  onChange: (value: number | string) => void;
  hasTwoColumns?: boolean;
  center?: boolean;
  dividers?: IDivider[];
}

const RadioGroup: FC<RadioGroupProps> = ({
  options,
  defaultValue,
  onChange,
  hasTwoColumns = true,
  center = true,
  dividers,
}) => {
  const [selectedValue, setSelectedValue] = useState<number | string>(
    defaultValue || options[0]?.value
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
      onChange(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div
      className={`grid gap-x-4 gap-y-2 ${
        hasTwoColumns ? "sm:grid-cols-2" : ""
      }`}
    >
      {sort(options, (o) => o.value as number).map((option) => {
        return (
          <Fragment key={option.value}>
            <label
              className={`inline-flex w-full py-4 sm:py-2 px-4 cursor-pointer border ${
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
          </Fragment>
        );
      })}
    </div>
  );
};

export default RadioGroup;
