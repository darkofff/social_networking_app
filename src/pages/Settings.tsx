import PreferencesCategory from "../features/settings/PreferencesCategory";
import SettingsRow from "../features/settings/SettingsRow";
import Main from "../ui/Main";

function Settings() {
  return (
    <div className="mt-6">
      <Main>
        <SettingsRow title="Preferences">
          <PreferencesCategory />
        </SettingsRow>
      </Main>
    </div>
  );
}

export default Settings;
