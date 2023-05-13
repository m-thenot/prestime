import React from "react";
import { IconProps } from "./types";

export const Chevron: React.FC<IconProps> = ({ width, height, ...props }) => {
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.4 18L8 16.6L12.6 12L8 7.4L9.4 6L15.4 12L9.4 18Z"
        fill="black"
      />
    </svg>
  );
};
