import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileData } from "../../services/apiUserData";
import { EditProfileObj } from "./profileTypes";
import { useModalOpenContext } from "../../contexts/ModalOpenContext";
import { useProfileData } from "../../contexts/ProfileDataContext";

import { toast } from "react-toastify";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const {
    profileData: { user_id },
    invalidateProfileData,
  } = useProfileData();

  const { closeModal } = useModalOpenContext();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: (editProfileObj: EditProfileObj) =>
      updateProfileData({ user_id, ...editProfileObj }),
    onSuccess: () => {
      invalidateProfileData();
      toast.success("Successfully updated profile");
      closeModal();
    },
    onError: () => toast.error("Error occured. Could not edit your profile."),
  });

  return { updateProfile, isPending };
}
