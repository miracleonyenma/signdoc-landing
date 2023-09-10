import React from "react";
import Sidebar from "@/components/appComponents/Sidebar";
// creating app layout component

const appLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      {children}
      <div>{/* Main account layout */}</div>
    </div>
  );
};

export default appLayout;
