import { createContext, useContext, useEffect, useState } from "react";
import { ChildrenProp } from "../types/ChildrenProp";
import { useLocation } from "react-router-dom";
import { useScreenWidth } from "../hooks/useScreenWidth";

interface ContextProp {
  isNavbarShown: boolean;
  isScreenWidthMedium?: boolean;
  setIsNavbarShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const navbarOptionsContext = createContext<ContextProp | null>(null);

function NavbarOptionsProvider({ children }: ChildrenProp) {
  const [isNavbarShown, setIsNavbarShown] = useState<boolean>(true);
  const { screenWidth } = useScreenWidth();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/search/menu") setIsNavbarShown(false);
    else if (location.pathname.startsWith("/search/") && screenWidth < 768) {
      setIsNavbarShown(false);
    } else setIsNavbarShown(true);
  }, [location.pathname, screenWidth]);

  return (
    <navbarOptionsContext.Provider value={{ isNavbarShown, setIsNavbarShown }}>
      {children}
    </navbarOptionsContext.Provider>
  );
}

function useNavbarOptionsContext() {
  const context = useContext(navbarOptionsContext);
  if (!context)
    throw new Error(
      "useNavbarOptionsContext used outside NavbarOptionProvider",
    );
  return context;
}

export { NavbarOptionsProvider, useNavbarOptionsContext };
