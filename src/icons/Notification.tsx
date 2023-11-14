import theme from "constants/theme";
import React from "react";
import { IconProps } from "./types";

export const Notification: React.FC<IconProps> = ({
  width,
  height,
  color = theme.colors.primary[100],
  ...props
}) => {
  return (
    <svg
      width={width || 24}
      height={height || 26}
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23.6668 8.16667V18.6667C23.6668 19.95 22.6168 21 21.3335 21H5.00016L0.333496 25.6667V4.66667C0.333496 3.38333 1.3835 2.33333 2.66683 2.33333H14.4502C14.3335 2.68333 14.3335 3.15 14.3335 3.5C14.3335 3.85 14.3335 4.31667 14.4502 4.66667H2.66683V18.6667H21.3335V9.21667C22.1502 9.1 22.9668 8.63333 23.6668 8.16667ZM16.6668 3.5C16.6668 5.48333 18.1835 7 20.1668 7C22.1502 7 23.6668 5.48333 23.6668 3.5C23.6668 1.51667 22.1502 0 20.1668 0C18.1835 0 16.6668 1.51667 16.6668 3.5Z"
        fill={color}
      />
    </svg>
  );
};
