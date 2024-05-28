import { createContext, useContext, useEffect, useState } from "react";
import { ChildrenProp } from "../types/ChildrenProp";
import { useLocation } from "react-router-dom";
import { useScreenWidth } from "../hooks/useScreenWidth";

interface ContextProp {
  isNavbarShown: boolean;
  isScreenWidthMedium?: boolean;
  setIsNavbarShown: React.Dispatch<React.SetStateAction<boolean>>;
  isArrowBackShown: boolean;
}

const navbarOptionsContext = createContext<ContextProp | null>(null);

function NavbarOptionsProvider({ children }: ChildrenProp) {
  const [isNavbarShown, setIsNavbarShown] = useState<boolean>(true);
  const [isArrowBackShown, setIsArrowBackShown] = useState<boolean>(false);
  const { screenWidth } = useScreenWidth();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/search/menu") setIsNavbarShown(false);
    else if (location.pathname.startsWith("/search/") && screenWidth < 768) {
      setIsNavbarShown(false);
    } else if (location.pathname.startsWith("/friends/") && screenWidth < 768) {
      setIsNavbarShown(false);
      setIsArrowBackShown(false);
    } else {
      setIsNavbarShown(true);
      setIsArrowBackShown(true);
    }
  }, [location.pathname, screenWidth]);

  return (
    <navbarOptionsContext.Provider
      value={{ isNavbarShown, setIsNavbarShown, isArrowBackShown }}
    >
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
