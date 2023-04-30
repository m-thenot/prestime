import React from "react";

interface ITagProps {
  text: string;
  className?: string;
}

const Tag: React.FC<ITagProps> = ({ text, className }) => {
  return (
    <div className={`bg-orange-100 rounded-lg ${className} px-2 w-fit`}>
      <p className="text-sm text-primary-100 font-bold">{text}</p>
    </div>
  );
};

export default Tag;
