import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileData } from "../../services/apiUserData";
import { UpdateProfileData } from "../../types/UpdateProfileData";
import { toast } from "react-toastify";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["profileData"]) as any;
  console.log(data);

  const user_id: string = data.user_id;

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: (formData: UpdateProfileData) =>
      updateProfileData({ user_id, ...formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profileData"],
      });
      toast.success("Success");
    },
    onError: () => toast.error("Could not change"),
  });

  return { updateProfile, isPending };
}
