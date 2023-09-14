import React from "react";
import { useSideBarContext } from "@/context/AppContext";

const AppLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { sideBarState } = useSideBarContext();
  return (
    <div
      className={` ${
        sideBarState.isActive ? "pl-10 md:pl-80" : "pl-10 md:pl-28"
      } app-layout__content`}
    >
      {/* Main account layout */}
      {children}
    </div>
  );
};

export default AppLayoutContent;
