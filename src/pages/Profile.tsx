import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import ProfileInfo from "../features/profile/ProfileInfo";
import LogCurrentSession from "../utilities/LogCurrentSession";

function Profile() {
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  async function handleLogout() {
    let { error } = await supabase.auth.signOut();
    QueryClient.removeQueries();
    navigate("/", { replace: true });
  }

  return (
    <div className="p-1">
      <ProfileInfo />
      {/* <UserPosts /> */}
      <LogCurrentSession />
      <Button callback={handleLogout}>Logout</Button>
    </div>
  );
}

export default Profile;
