import React from "react";
import { IconProps } from "./types";

const direction = {
  right: {
    rotation: 0,
    translationX: "1px",
    translationY: "0px",
  },
  left: {
    rotation: 180,
    translationX: "-1px",
    translationY: "0px",
  },
  bottom: {
    rotation: 90,
    translationX: "0px",
    translationY: "-1px",
  },
  top: {
    rotation: -90,
    translationX: "0px",
    translationY: "1px",
  },
};

interface IChevronIconProps extends IconProps {
  headDirection?: "right" | "left" | "bottom" | "top";
}

export const Chevron: React.FC<IChevronIconProps> = ({
  width,
  height,
  headDirection = "right",
  ...props
}) => {
  const rotation = direction[headDirection].rotation;
  const translationX = direction[headDirection].translationX;
  const translationY = direction[headDirection].translationY;

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `translate(${translationX},${translationY}) rotate(${rotation}deg)`,
        transition: "transform 1s",
      }}
      {...props}
    >
      <path
        d="M9.4 18L8 16.6L12.6 12L8 7.4L9.4 6L15.4 12L9.4 18Z"
        fill="black"
      />
    </svg>
  );
};
