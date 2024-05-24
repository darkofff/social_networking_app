import { Outlet } from "react-router-dom";
import Navbar from "../features/navigation/Navbar";
import Row from "./Row";
import { useTheme } from "../contexts/ThemeContext";
import { useNavbarOptionsContext } from "../contexts/NavbarOptionsContext";

function AppLayout() {
  const { theme } = useTheme();
  const { isNavbarShown } = useNavbarOptionsContext();
  return (
    <div className={theme}>
      <div className="bg-neutral-100 font-LibreFranklin text-neutral-900 dark:bg-neutral-800  dark:text-neutral-200">
        <div className="relative mx-auto min-h-dvh max-w-[1280px] md:flex  ">
          <Navbar />
          <main
            className={`min-h-dvh  ${isNavbarShown ? "pb-[66px]" : ""}   grow   md:w-full md:overflow-y-auto md:pb-0  `}
          >
            <Row>
              <Outlet />
            </Row>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
