import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileData } from "../../services/menageData";
import { UpdateProfileData } from "../../types/UpdateProfileData";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["profileData"]);
  console.log(data);

  const user_id: string = data.user_id;

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: (formData: UpdateProfileData) =>
      updateProfileData({ user_id, ...formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profileData"],
      });
      alert("Success");
    },
    onError: () => alert("Could not change"),
  });

  return { updateProfile, isPending };
}
