import { ChangeEvent } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Select from "../../ui/Select";

enum ThemeTypes {
  DARK = "dark",
  LIGHT = "light",
  DEFAULT = "default",
}

function themeSetting() {
  const { theme, setTheme } = useTheme();

  function onChooseTheme(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as ThemeTypes;
    setTheme(value);
  }

  return (
    <Select className="">
      <label htmlFor="theme">
        <span className="font-semibold">Apperance: </span> device theme
      </label>
      <select name="theme" id="theme" value={theme} onChange={onChooseTheme}>
        <option value="default">Default device theme</option>
        <option value="light">Light mode</option>
        <option value="dark">Dark mode</option>
      </select>
    </Select>
  );
}

export default themeSetting;
