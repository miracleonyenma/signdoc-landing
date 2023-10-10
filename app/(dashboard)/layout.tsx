"use client";
import "../../assets/css/main.css";
import React from "react";
import Sidebar from "@/components/appComponents/Sidebar";
import { AppContextProvider } from "@/context/AppContext";
import AppLayoutContent from "@/components/appComponents/AppLayoutContent";
import { useSession, getSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { AuthProvider } from "../AuthProvider";
import AppHeader from "@/components/appComponents/AppHeader";
// creating app layout component

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  // check if there is a user logged in
  if (status === "unauthenticated") {
    return (
      <>
        <div className="h-64 flex flex-col gap-4 justify-center items-center">
          <p>Please login first :(</p>
          {/* login user */}
          <Button variant="default" onClick={() => signIn()}>
            Login
          </Button>
        </div>
      </>
    );
  }

  return (
    <AppContextProvider>
      <div className="app-layout">
        <Sidebar />
        <AppHeader />
        <AppLayoutContent>
          {/* Main account layout */}
          {children}
        </AppLayoutContent>
      </div>
    </AppContextProvider>
  );
};

export default AppLayout;
