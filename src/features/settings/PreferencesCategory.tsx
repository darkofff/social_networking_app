import LanguageSetting from "./LanguageSetting";
import SettingsRow from "./SettingsRow";
import ThemeSetting from "./ThemeSetting";

function PreferencesCategory() {
  return (
    <SettingsRow title="Preferences">
      <ThemeSetting />
      <LanguageSetting />
    </SettingsRow>
  );
}

export default PreferencesCategory;
