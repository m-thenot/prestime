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

interface IArrowIconProps extends IconProps {
  headDirection?: "right" | "left" | "bottom" | "top";
}

export const Arrow: React.FC<IArrowIconProps> = ({
  width,
  height,
  headDirection = "right",
  color = "black",
}) => {
  const rotation = direction[headDirection].rotation;
  const translationX = direction[headDirection].translationX;
  const translationY = direction[headDirection].translationY;

  return (
    <svg
      width={width || 20}
      height={height || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `translate(${translationX},${translationY}) rotate(${rotation}deg)`,
        transition: "transform 1s",
      }}
    >
      <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill={color} />
    </svg>
  );
};
