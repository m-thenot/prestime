import React from "react";
import { IconProps } from "./types";

export const Account: React.FC<IconProps> = ({ width, height }) => {
  return (
    <svg
      width={width || 32}
      height={height || 32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="black"
        d="M10.75 12a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zM16 5.25a6.75 6.75 0 00-4.962 11.326c-2.728 1.881-4.792 5.235-5.767 9.247a.75.75 0 101.458.354c.948-3.902 2.96-6.973 5.43-8.544a.758.758 0 00.058-.042A6.719 6.719 0 0016 18.75a6.719 6.719 0 003.783-1.159.74.74 0 00.059.042c2.469 1.57 4.481 4.642 5.43 8.544a.75.75 0 001.457-.354c-.975-4.012-3.04-7.366-5.767-9.247A6.75 6.75 0 0016 5.25z"
      />
    </svg>
  );
};
