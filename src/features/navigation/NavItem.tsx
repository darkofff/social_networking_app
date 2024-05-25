import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { navigateTopPage } from "../../utilities/navigateTopPage";

interface Props {
  to: string;
  children: ReactNode;
  name?: string;
}

function NavItem({ to, children, name }: Props) {
  const navLinkSytles = `h-12 w-12   items-center md:flex md:h-auto md:w-full md:flex-col    md:hover:-translate-y-[1px]   md:py-1 xl:flex-row xl:justify-start shadow-md xl:gap-x-2 xl:py-4 rounded-lg transition-all md:active:translate-y-[2px] p-1 sm:h-[52px] sm:w-[52px] `;

  return (
    <NavLink
      to={to}
      onClick={navigateTopPage}
      className={({ isActive }) =>
        isActive
          ? `${navLinkSytles} scale-105  border-green-500/15  bg-green-500/40 shadow-lg md:scale-[1.02] md:bg-green-500/20 md:hover:-translate-y-0 md:active:translate-y-0`
          : `${navLinkSytles} bg-neutral-400/25`
      }
    >
      <div className=" md:h-8 md:w-8 [&>*]:h-full [&>*]:w-full">{children}</div>
      <p className="hidden font-medium md:block">
        {name?.toUpperCase() || to.toUpperCase()}
      </p>
    </NavLink>
  );
}

export default NavItem;
