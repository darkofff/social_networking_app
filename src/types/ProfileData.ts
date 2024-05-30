export interface ProfileData {
  user_id: string;
  created_at: string;
  email: string;
  username: string;
  profile_pic: string;
  bgc_pic: string;
  is_registration_complete: boolean;
  name: string;
  last_name: string;
  bio: string;
  is_profile_created: boolean;
  image_1: string;
  image_2: string;
  image_3: string;
  image_4: string;
  image_5: string;
  image_6: string;
  bio_swipe: string;
}

export type PhotosIds =
  | "image_1"
  | "image_2"
  | "image_3"
  | "image_4"
  | "image_5"
  | "image_6";
