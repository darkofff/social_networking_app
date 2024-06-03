import { PhotoKeys, PhotosObj, SwipeProfileData } from "./types/searchTypes";

interface BioObj {
  bio: string;
  bio_swipe: string;
}

export function prepareDataToDispatch(
  myPhotos: PhotosObj,
  bioObj: BioObj,
  user_id: string,
) {
  const swipeProfileData: SwipeProfileData = {
    photosToUpload: {},
    imageNameObj: {},
    userProfileDataToUpload: {},
    user_id: user_id,
  };

  Object.keys(myPhotos).forEach((photoObj) => {
    if (
      myPhotos[`${photoObj}` as PhotoKeys].isDbImageRemoved &&
      !myPhotos[`${photoObj}` as PhotoKeys].url &&
      !myPhotos[`${photoObj}` as PhotoKeys].inputValue
    ) {
      swipeProfileData.userProfileDataToUpload[`${photoObj}` as PhotoKeys] =
        null;
    }
    if (
      !myPhotos[`${photoObj}` as PhotoKeys].url &&
      myPhotos[`${photoObj}` as PhotoKeys].inputValue
    ) {
      // adds photos to update
      swipeProfileData.photosToUpload[`${photoObj}` as PhotoKeys] =
        myPhotos[`${photoObj}` as PhotoKeys].inputValue;

      let imageName =
        `${Math.random()}-/${myPhotos[`${photoObj}` as PhotoKeys].name}`.replaceAll(
          "/",
          "",
        );

      // creates obj with names of the files to upload
      swipeProfileData.imageNameObj[`${photoObj}` as PhotoKeys] = imageName;

      //creates obj with finished paths to upload to users table
      swipeProfileData.userProfileDataToUpload[`${photoObj}` as PhotoKeys] =
        `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/swipe_images/${imageName}`;
    }
  });

  if (bioObj.bio && bioObj.bio !== bioObj.bio_swipe) {
    swipeProfileData.userProfileDataToUpload.bio_swipe = bioObj.bio;
  }

  return swipeProfileData;
}
