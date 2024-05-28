import DisplayUserPosts from "./DisplayUserPosts";
import ProfileInfo from "./ProfileInfo";
import useProfileData from "./useProfileData";

function ProfileMain() {
  const {
    data: profileData,
    isPending: isPendingProfileData,
    isSpectatorMode,
  } = useProfileData();

  console.log(profileData);
  if (isPendingProfileData) return <h1>Big Loading Spinner...</h1>;

  return (
    <>
      <ProfileInfo
        profileData={profileData}
        isPendingProfileData={isPendingProfileData}
        isSpectatorMode={isSpectatorMode}
      />
      <DisplayUserPosts
        currentUsername={profileData.username}
        isPendingProfileData={isPendingProfileData}
      />
    </>
  );
}

export default ProfileMain;
