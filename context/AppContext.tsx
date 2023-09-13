"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

const SideBarContext = createContext<{
  sideBarState: SideBarType;
  setSideBarState: React.Dispatch<React.SetStateAction<SideBarType>>;
}>({
  sideBarState: {} as SideBarType,
  setSideBarState: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const [sideBarState, setSideBarState] = useState<SideBarType>({
    isActive: true,
  });

  return (
    <SideBarContext.Provider value={{ sideBarState, setSideBarState }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBarContext = () => useContext(SideBarContext);
