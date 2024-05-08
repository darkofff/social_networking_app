import { Outlet } from "react-router-dom";
import Navbar from "../features/navigation/Navbar";
import Row from "./Row";
import { useTheme } from "../contexts/ThemeContext";

function AppLayout() {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <div className="bg-neutral-50 dark:bg-neutral-900">
        <div className="relative mx-auto min-h-dvh max-w-[1280px] md:flex  ">
          <Navbar />
          <main className="min-h-dvh  pb-[66px] text-neutral-900  dark:text-neutral-200  md:w-full md:overflow-y-auto md:pb-0  ">
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
