import { HiChat } from "react-icons/hi";
import {
  HiCog8Tooth,
  HiGlobeEuropeAfrica,
  HiHome,
  HiMagnifyingGlass,
} from "react-icons/hi2";

import NavItem from "./NavItem";

function Navbar() {
  return (
    <nav className=" fixed bottom-0 left-0 z-[99] flex h-16 w-full items-center justify-between overscroll-contain  rounded-md bg-gradient-to-bl from-emerald-300/50 via-teal-300/50 to-blue-500/50 p-2  dark:bg-neutral-700/90 dark:text-neutral-300 md:sticky md:top-0 md:mx-2 md:min-h-dvh md:w-40 md:flex-col md:justify-normal md:space-y-8 md:overflow-y-auto md:bg-none xl:w-60">
      <img
        src="logos/logo-main.png"
        alt="logo"
        className="hidden  p-4 md:block"
      />
      <NavItem to="search">
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
