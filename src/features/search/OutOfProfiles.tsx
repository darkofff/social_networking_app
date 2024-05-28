import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { BiLeftArrow } from "react-icons/bi";
import { useTheme } from "../../contexts/ThemeContext";

function OutOfProfiles() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <div className="flex h-dvh items-center justify-center ">
      <div className="flex min-h-[80vh] max-w-[500px] flex-col items-center justify-center gap-4 rounded-lg bg-neutral-200 dark:bg-neutral-600">
        <p className="h-0 overflow-hidden">
          STRETCHER__________________________________________________________________________________________________________________________________________________________________
        </p>
        <img
          // src="logos/logo-main.png"
          className="max-w-40 pb-12"
          src={
            theme === "dark"
              ? "../../../public/logos/logo-main-darkmode.png"
              : "../../../public/logos/logo-main.png"
          }
          alt="logo"
        />
        <div className="text-center">
          <h1 className="text-2xl">There are no more profiles left</h1>
          <h1 className="text-xl">Try again later</h1>
        </div>
        <Button
          style="empty"
          callback={() => navigate("/profile", { replace: true })}
        >
          <span className="flex items-center justify-around">
            <BiLeftArrow />
            Go back
          </span>
        </Button>
      </div>
    </div>
  );
}

export default OutOfProfiles;
