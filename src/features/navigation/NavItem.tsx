import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { navigateTopPage } from "../../utilities/navigateTopPage";

interface Props {
  to: string;
  children: ReactNode;
}

function NavItem({ to, children }: Props) {
  return (
    <NavLink
      to={to}
      onClick={navigateTopPage}
      className="h-12 w-12 items-center rounded-lg md:flex md:h-auto md:w-full md:flex-col md:rounded-none md:border-b-2 md:py-1  xl:flex-row xl:justify-start xl:gap-x-2 xl:py-4 "
    >
      <div className=" md:h-8  md:w-8 [&>*]:h-full [&>*]:w-full">
        {children}
      </div>
      <p className="hidden font-medium md:block">{to.toUpperCase()}</p>
    </NavLink>
  );
}

export default NavItem;
