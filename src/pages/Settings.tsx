import { useTheme } from "../contexts/ThemeContext";
import Button from "../ui/Button";
import Main from "../ui/Main";

function Settings() {
  const { theme, setTheme } = useTheme();
  return (
    <Main>
      <div>
        <span>Theme:</span>
        <Button
          callback={() =>
            setTheme((currentTheme) => {
              if (currentTheme === "dark") return "light";
              else return "dark";
            })
          }
        >
          Switch color theme
        </Button>
      </div>
      <h1>THEME: {theme}</h1>
    </Main>
  );
}

export default Settings;
