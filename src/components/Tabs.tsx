"use client";
import React, { useState } from "react";

interface ITab {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface ITabsProps {
  tabs: ITab[];
}

interface ITabProps {
  title: string;
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Tab: React.FC<ITabProps> = ({ title, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`pb-2 cursor-pointer w-full text-center ${
      isActive
        ? "border-b-2 border-primary-100 font-bold"
        : "border-b-2 border-gray-300 text-gray-500"
    }`}
  >
    {title}
  </div>
);

const Tabs: React.FC<ITabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <>
      <div className="flex p-4">
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            title={tab.title}
            isActive={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          />
        ))}
      </div>

      <div className="p-4">
        {tabs.map(
          (tab) =>
            activeTab === tab.key && <div key={tab.key}>{tab.content}</div>
        )}
      </div>
    </>
  );
};

export default Tabs;
