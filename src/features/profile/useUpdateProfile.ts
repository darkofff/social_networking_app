import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileData } from "../../services/apiUserData";
import { toast } from "react-toastify";
import { EditProfileObj } from "./profileTypes";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["profileData"]) as any;

  const user_id: string = data.user_id;

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: (editProfileObj: EditProfileObj) =>
      updateProfileData({ user_id, ...editProfileObj }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profileData"],
      });
      toast.success("Successfully updated profile");
    },
    onError: () => toast.error("Error occured. Could not edit your profile."),
  });

  return { updateProfile, isPending };
}
