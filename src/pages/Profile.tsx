import LogCurrentSession from "../utilities/LogCurrentSession";
import ProfileMain from "../features/profile/ProfileMain";

function Profile() {
  return (
    <div className="p-1 md:p-0">
      <ProfileMain />
      {/* <LogCurrentSession /> */}
    </div>
  );
}

export default Profile;
