import React from "react";

interface ITagProps {
  text: string;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
}

const Tag: React.FC<ITagProps> = ({
  text,
  className,
  backgroundColor = "bg-orange-100",
  textColor = "text-primary-100",
}) => {
  return (
    <div className={`${backgroundColor} rounded-lg ${className} px-2 w-fit`}>
      <p className={`text-sm ${textColor} font-bold mb-0`}>{text}</p>
    </div>
  );
};

export default Tag;
