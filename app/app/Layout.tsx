import React from "react";
// creating app layout component

const appLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <div>
      {/* Main account layout */}
      </div>
    </div>
  );
};

export default appLayout;
