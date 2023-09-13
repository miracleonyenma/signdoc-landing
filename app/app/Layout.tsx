import React from "react";
import Sidebar from "@/components/appComponents/Sidebar";
import { AppContextProvider } from "@/context/AppContext";
import { useSideBarContext } from "@/context/AppContext";

// creating app layout component

const appLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContextProvider>
      <div className="app-layout">
        <Sidebar />
        <div className="app-layout__content">
          {/* Main account layout */}
          {children}
        </div>
      </div>
    </AppContextProvider>
  );
};

export default appLayout;
