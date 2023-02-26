import React, { FC } from "react";

interface ProgressProps {
  percent: number;
  barColor?: string;
}

const Progress: FC<ProgressProps> = ({
  percent,
  barColor = "bg-primary-100",
}) => {
  const width = `${percent}%`;

  return (
    <div className={`bg-gray-100 rounded-lg w-full h-3`}>
      <div className={`rounded-lg	 ${barColor} h-full`} style={{ width }} />
    </div>
  );
};

export default Progress;
