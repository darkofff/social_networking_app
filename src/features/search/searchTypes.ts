export interface FormData {
  image_1?: FileList;
  image_2?: FileList;
  image_3?: FileList;
  image_4?: FileList;
  image_5?: FileList;
  image_6?: FileList;
}

export type IndexType = 1 | 2 | 3 | 4 | 5 | 6;

export interface PhotoObj {
  url: string;
  isDbImageRemoved: boolean;

  localUrl: string;
  inputValue: string | File;
  name: string;
}

export interface PhotosObj {
  image_1: PhotoObj;
  image_2: PhotoObj;
  image_3: PhotoObj;
  image_4: PhotoObj;
  image_5: PhotoObj;
  image_6: PhotoObj;
}
//

export type PhotoKeys =
  | "image_1"
  | "image_2"
  | "image_3"
  | "image_4"
  | "image_5"
  | "image_6";

interface PhotosToUpload {
  image_1?: File | string;
  image_2?: File | string;
  image_3?: File | string;
  image_4?: File | string;
  image_5?: File | string;
  image_6?: File | string;
}

export interface ImageNameObj {
  image_1?: string;
  image_2?: string;
  image_3?: string;
  image_4?: string;
  image_5?: string;
  image_6?: string;
}

interface UserProfileDataToUpload {
  image_1?: string | null;
  image_2?: string | null;
  image_3?: string | null;
  image_4?: string | null;
  image_5?: string | null;
  image_6?: string | null;
  bio_swipe?: string;
}

export interface SwipeProfileData {
  photosToUpload: PhotosToUpload;
  imageNameObj: ImageNameObj;
  userProfileDataToUpload: UserProfileDataToUpload;
  user_id: string;
}

export interface GetUsername {
  username?: string;
  currentUserUsername?: string;
  index: number;
}
