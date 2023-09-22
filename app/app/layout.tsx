"use client";
import React from "react";
import Sidebar from "@/components/appComponents/Sidebar";
import { AppContextProvider } from "@/context/AppContext";
import AppLayoutContent from "@/components/appComponents/AppLayoutContent";

// creating app layout component

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContextProvider>
      <div className="app-layout">
        <Sidebar />
        <AppLayoutContent>
          {/* Main account layout */}
          {children}
        </AppLayoutContent>
      </div>
    </AppContextProvider>
  );
};

export default AppLayout;
