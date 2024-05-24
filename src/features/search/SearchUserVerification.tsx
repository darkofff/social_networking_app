import ConfirmScreen from "./ConfirmScreen";
import useProfileData from "../profile/useProfileData";

function SearchUserVerification() {
  // If there is more than one photo and there is bio allow to access search
  const { data: profileData, isPending } = useProfileData();
  

  let is_profile_created = false;
  for (let i = 1; i <= 6; i++) {
    if (profileData[`image_${i}`]) {
      is_profile_created = true;
    }
  }
  if (!profileData.bio_swipe) {
    is_profile_created = false;
  }

  if (!isPending)
    return (
      <ConfirmScreen
        is_profile_created={is_profile_created}
        profileData={profileData}
        isPending={isPending}
      
      />
    );
}

export default SearchUserVerification;
