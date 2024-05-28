import { useNavigate } from "react-router-dom";
import { useNavbarOptionsContext } from "../../contexts/NavbarOptionsContext";

import {
  HiCog8Tooth,
  HiGlobeEuropeAfrica,
  HiHome,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import { HiChat } from "react-icons/hi";
import NavItem from "./NavItem";
import { BiArrowBack } from "react-icons/bi";
import { useTheme } from "../../contexts/ThemeContext";

function Navbar() {
  const { isNavbarShown } = useNavbarOptionsContext();
  const navigate = useNavigate();
  const { theme } = useTheme();

  function goBack() {
    navigate("/profile");
  }

  if (!isNavbarShown)
    return (
      <div
        className={`fixed left-1 top-1 z-50 cursor-pointer   md:sticky  md:ml-10 md:mt-9 `}
      >
        <div
          className="flex items-center rounded-lg px-4 py-2 text-neutral-900 hover:text-neutral-700 dark:text-neutral-200 hover:dark:text-neutral-400"
          onClick={goBack}
        >
          <BiArrowBack className="h-10 w-10" />
          <p className="text-nowrap font-bold">GO BACK</p>
        </div>
      </div>
    );
  return (
    <nav className=" fixed bottom-0 left-0 z-[99] flex w-full items-center justify-between overscroll-contain rounded-lg border-t border-neutral-400 bg-neutral-300/70 px-1 py-1 dark:border-neutral-950 dark:bg-neutral-900/70 md:sticky md:top-0 md:h-dvh md:w-40  md:flex-col md:justify-normal md:space-y-8 md:overflow-y-auto md:rounded-none md:border-0   md:bg-transparent md:px-2 md:dark:bg-transparent lg:w-56 xl:w-72">
      <img
        src={
          theme === "light"
            ? "/logos/logo-main.png"
            : "/logos/logo-main-darkmode.png"
        }
        /* src="logos/logo-main.png" */
        alt="logo"
        className="hidden  p-4 md:block"
      />
      <NavItem to="search/menu" name="search">
        <HiMagnifyingGlass />
      </NavItem>
      <NavItem to="contacts">
        <HiChat />
      </NavItem>
      <NavItem to="news">
        <HiGlobeEuropeAfrica />
      </NavItem>
      <NavItem to="profile">
        <HiHome />
      </NavItem>
      <NavItem to="settings">
        <HiCog8Tooth />
      </NavItem>
    </nav>
  );
}

export default Navbar;
