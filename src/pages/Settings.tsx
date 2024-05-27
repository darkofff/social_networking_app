import AccountCategory from "../features/settings/AccountCategory";
import PreferencesCategory from "../features/settings/PreferencesCategory";
import Main from "../ui/Main";

function Settings() {
  return (
    <div className="mt-6">
      <Main>
        <PreferencesCategory />
        <AccountCategory />
      </Main>
    </div>
  );
}

export default Settings;
