import React from "react";
import "./tabbedform.css";
import { tabConfig } from "./components/tabsConfig";
const TabbedFormInterview = () => {
  return (
    <div>
      <TabLayout tabs={tabConfig} />
    </div>
  );
};

const TabLayout = ({ tabs = [] }) => {
  return (
    <div className="tab-layout">
      {tabs.map({ tab, _ }, (index) => {
        return <span className="tab">{tab}</span>;
      })}
    </div>
  );
};

export default TabbedFormInterview;
