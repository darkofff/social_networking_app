import { EditProfileObj } from "../features/profile/profileTypes";
import { PhotoKeys, SwipeProfileData } from "../features/search/searchTypes";
import { supabase } from "./supabaseClient";

/* 
  For managing user data but not auth
*/

export async function updateProfileData(editProfileObj: EditProfileObj) {
  const { error: userUpdateError } = await supabase
    .from("users")
    .update(editProfileObj.profileData)
    .eq("user_id", editProfileObj.user_id)
    .select();

  if (userUpdateError) throw new Error("Failed to update user's info");

  if (
    editProfileObj?.bucketData?.bgc_name !== undefined &&
    editProfileObj?.bucketData?.bgc_file !== undefined
  ) {
    const { error: errorBgc } = await supabase.storage
      .from("bgc_pics")
      .upload(
        editProfileObj.bucketData.bgc_name,
        editProfileObj.bucketData.bgc_file,
      );
    if (errorBgc) throw new Error("Couldn't upload background image");
  }
  if (
    editProfileObj?.bucketData?.profile_name !== undefined &&
    editProfileObj?.bucketData?.profile_file !== undefined
  ) {
    const { error: errorProfile } = await supabase.storage
      .from("profile_pics")
      .upload(
        editProfileObj.bucketData.profile_name,
        editProfileObj.bucketData.profile_file,
      );
    if (errorProfile) throw new Error("Couldn't upload profile image");
  }

  return true;
}

export async function getProfileData() {
  let { data, error } = await supabase.from("users").select("*");
  if (error) throw new Error(error.message);
  const profileData = data?.at(0);

  return profileData;
}

export async function updateSwipeData(swipeProfileData: SwipeProfileData) {
  console.log(swipeProfileData);

  // 1.Update user table

  const { data, error: dataError } = await supabase
    .from("users")
    .update(swipeProfileData.userProfileDataToUpload)
    .eq("user_id", swipeProfileData.user_id)
    .select();

  if (dataError) {
    console.error(dataError.message);
    throw new Error("Could not create profile");
  }

  // 2. If update was successful upload photo

  Object.keys(swipeProfileData.imageNameObj).forEach(async (key) => {
    const name = swipeProfileData.imageNameObj[`${key}` as PhotoKeys] as string;
    const path = swipeProfileData.photosToUpload[`${key}` as PhotoKeys] as File;

    console.log(name, path);

    const { error: errorImage } = await supabase.storage
      .from("swipe_images")
      .upload(name, path);
    if (errorImage) {
      console.error(errorImage.message);
      throw new Error("Could not create profile");
    }
  });

  return data;
}
