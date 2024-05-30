import { useSearchParams } from "react-router-dom";
import DisplayUserPosts from "./DisplayUserPosts";
import ProfileInfo from "./ProfileInfo";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { useGetProfileByUsername } from "../../hooks/useGetProfileByUsername";

function ProfileMain() {
  const [searchParams] = useSearchParams();
  const usernameParams = searchParams.get("username");

  const { profileData: userProfileData } = useProfileData();
  const isSpectatorMode = usernameParams === null ? false : true;

  const { profileData, isPending: isPendingProfileData } =
    useGetProfileByUsername(usernameParams || "");

  if (!isSpectatorMode)
    return (
      <>
        <ProfileInfo
          profileData={userProfileData}
          isPendingProfileData={false}
          isSpectatorMode={false}
        />
        <DisplayUserPosts
          currentUsername={userProfileData.username}
          isPendingProfileData={false}
        />
      </>
    );
  if (isSpectatorMode && usernameParams !== null)
    return (
      <>
        <ProfileInfo
          profileData={profileData}
          isPendingProfileData={isPendingProfileData}
          isSpectatorMode={true}
        />
        <DisplayUserPosts
          currentUsername={usernameParams}
          isPendingProfileData={isPendingProfileData}
        />
      </>
    );
}

export default ProfileMain;
