import { PhotoKeys, SwipeProfileData } from "../features/search/searchTypes";
import { UpdateProfileData } from "../types/UpdateProfileData";
import { supabase } from "./supabaseClient";

/* 
  For managing user data but not auth
*/

interface Data extends UpdateProfileData {
  user_id: string;
}
interface DataOptional extends UpdateProfileData {
  user_id?: string;
}

export async function updateProfileData(formData: Data) {
  const user_id = formData.user_id;
  const updateObj: DataOptional = formData;
  delete updateObj.user_id;

  const { data, error } = await supabase
    .from("users")
    .update(updateObj)
    .eq("user_id", user_id)
    .select();

  if (error) throw new Error(error.message);

  return data;
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

  // 2. If update successful upload photo

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
