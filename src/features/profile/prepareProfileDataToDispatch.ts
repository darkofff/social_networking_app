import { UpdateProfileData } from "../../types/UpdateProfileData";
import { EditProfileObj, PhotoObj } from "./profileTypes";

interface Props {
  formData: UpdateProfileData;
  bgc_pic: PhotoObj;
  profile_pic: PhotoObj;
  dataToUpdate: any;
}

export function prepareDataToDispatch({
  formData,
  bgc_pic,
  profile_pic,
  dataToUpdate,
}: Props) {
  

  let newObj: EditProfileObj = {
    profileData: {},
    bucketData: {},
  };

  if (newObj.bucketData === undefined || newObj.profileData === undefined)
    return {}; // Idk, typescript is dumb

  if (profile_pic.isPhotoEddited) {
    newObj.bucketData.profile_file = profile_pic.inputValue as File;
    const profileName = `${Math.random()}-${[profile_pic.name.replaceAll("/", "-")]}`;
    newObj.bucketData.profile_name = profileName;
    newObj.profileData.profile_pic = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/profile_pics/${profileName}`;
  }
  if (bgc_pic.isPhotoEddited) {
    newObj.bucketData.bgc_file = bgc_pic.inputValue as File;
    const bgcName = `${Math.random()}-${[bgc_pic.name.replaceAll("/", "-")]}`;
    newObj.bucketData.bgc_name = bgcName;
    newObj.profileData.bgc_pic = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/bgc_pics/${bgcName}`;
  }
  if (formData.name !== dataToUpdate.name) {
    newObj.profileData.name = formData.name;
  }
  if (formData.last_name !== dataToUpdate.last_name) {
    newObj.profileData.last_name = formData.last_name;
  }
  if (formData.bio !== dataToUpdate.bio) {
    newObj.profileData.bio = formData.bio;
  }

  return newObj;
}
