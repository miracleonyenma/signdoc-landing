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

interface activeDocument {
  document: any | null;
  setDocument: (document: any | null) => void;
}
const ActiveDocumentContext = createContext<activeDocument>(
  {} as activeDocument
);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const [document, setDocument] = useState<any | null>(null);

  const [sideBarState, setSideBarState] = useState<SideBarType>({
    isActive: false,
  });

  return (
    <SideBarContext.Provider value={{ sideBarState, setSideBarState }}>
      <ActiveDocumentContext.Provider value={{ document, setDocument }}>
        {children}
      </ActiveDocumentContext.Provider>
    </SideBarContext.Provider>
  );
};

export const useSideBarContext = () => useContext(SideBarContext);
export const useActiveDocumentContext = () => useContext(ActiveDocumentContext);
