interface DataToUpdateElements {
  bgc_pic: any;
  profile_pic: any;
  username: any;
  name: any;
  last_name: any;
  bio: any;
}

export interface DataToUpdate {
  dataToUpdate: DataToUpdateElements;
}

export interface PhotoObj {
  url: string | null;
  localUrl: string | null;
  inputValue: File | null;

  isPhotoEddited: boolean;
  name: string;
}

interface ProfileData {
  name?: string;
  last_name?: string;
  bio?: string;
  profile_pic?: string;
  bgc_pic?: string;
}
interface BucketData {
  bgc_file?: File;
  bgc_name?: string;
  profile_file?: File;
  profile_name?: string;
}

export interface EditProfileObj {
  profileData?: ProfileData | undefined;
  bucketData?: BucketData | undefined;
  user_id?: string;
}
