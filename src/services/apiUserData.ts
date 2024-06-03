import { EditProfileObj } from "../features/profile/profileTypes";
import {
  PhotoKeys,
  SwipeProfileData,
} from "../features/search/types/searchTypes";
import { ProfileData } from "../types/ProfileData";
import { supabase } from "./supabaseClient";

/* 
  For managing user data but not auth
*/

export async function updateProfileData(editProfileObj: EditProfileObj) {
  const { data, error: userUpdateError } = await supabase
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

export async function updateSwipeData(swipeProfileData: SwipeProfileData) {
  // 1.Update user table

  const { data, error: dataError } = await supabase
    .from("users")
    .update(swipeProfileData.userProfileDataToUpload)
    .eq("user_id", swipeProfileData.user_id)
    .select();

  if (dataError) {
    throw new Error("Could not create profile");
  }

  // 2. If update was successful upload photo

  Object.keys(swipeProfileData.imageNameObj).forEach(async (key) => {
    const name = swipeProfileData.imageNameObj[`${key}` as PhotoKeys] as string;
    const path = swipeProfileData.photosToUpload[`${key}` as PhotoKeys] as File;

    const { error: errorImage } = await supabase.storage
      .from("swipe_images")
      .upload(name, path);
    if (errorImage) {
      throw new Error("Could not create profile");
    }
  });

  return data;
}

// FETCHING PROFILES DATA

export async function getProfileByUsername({ username }: { username: string }) {
  let { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username);
  if (error) throw new Error(error.message);
  const profileData = (data?.at(0) as ProfileData) || [];

  return profileData;
}

export async function getProfileData(username: string | null) {
  if (username === null) {
    let { data, error } = await supabase.from("users").select("*");
    if (error) throw new Error(error.message);
    const profileData = data?.at(0);

    return profileData;
  }

  let { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username);
  if (error) throw new Error(error.message);
  const profileData = data?.at(0);

  return profileData;
}

export async function getCurrentUserProfile(user_id: string) {
  let { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw new Error(error.message);
  const profileData = data?.at(0);

  // Set current session username
  const username = profileData.username;
  const { error: usernameError } = await supabase.rpc("set_current_username", {
    username: username,
  });
  if (usernameError) throw new Error("Couldn't set new session username");

  return profileData;
}
