import { useLogout } from "../../hooks/useLogout";
import Button from "../../ui/Button";

function LogoutSetting() {
  const { logout, isPending } = useLogout();

  return (
    <div>
      <Button style="underline" callback={logout} disabled={isPending}>
        Logout
      </Button>
    </div>
  );
}

export default LogoutSetting;
