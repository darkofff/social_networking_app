import useProfileData from "../profile/useProfileData";

function useEditPost(username: string) {
  const { data: profileData, error, isPending } = useProfileData();

  const isEditAllowed = username === profileData.username;

  return isEditAllowed;
}

export default useEditPost;
