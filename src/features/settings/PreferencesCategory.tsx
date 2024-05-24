import LanguageSetting from "./LanguageSetting";
import ThemeSetting from "./ThemeSetting";

function PreferencesCategory() {
  return (
    <div className="space-y-2">
      <ThemeSetting />
      <LanguageSetting />
    </div>
  );
}

export default PreferencesCategory;
