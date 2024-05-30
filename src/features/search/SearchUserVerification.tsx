import { useProfileData } from "../../contexts/ProfileDataContext";
import { PhotosIds } from "../../types/ProfileData";
import ConfirmScreen from "./ConfirmScreen";
// import { useProfileData } from "../profile/useProfileData";

function SearchUserVerification() {
  // If there is more than one photo and there is bio allow to access search
  let is_profile_created = false;

  const { profileData } = useProfileData();

  for (let i = 1; i <= 6; i++) {
    if (profileData[`image_${i}` as PhotosIds]) {
      is_profile_created = true;
      break;
    }
  }
  if (!profileData.bio_swipe) {
    is_profile_created = false;
  }

  return (
    <ConfirmScreen
      is_profile_created={is_profile_created}
      profileData={profileData}
    />
  );
}

export default SearchUserVerification;
