import LogoutSetting from "./LogoutSetting";
import SettingsRow from "./SettingsRow";

function AccountCategory() {
  return (
    <SettingsRow title="Account">
      <LogoutSetting />
    </SettingsRow>
  );
}

export default AccountCategory;
