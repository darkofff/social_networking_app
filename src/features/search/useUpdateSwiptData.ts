import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalOpenContext } from "../../contexts/ModalOpenContext";
import { updateSwipeData } from "../../services/apiUserData";
import { SwipeProfileData } from "./searchTypes";
import { toast } from "react-toastify";

export function useUpdateSwipeData() {
  const queryClient = useQueryClient();
  const { closeModal } = useModalOpenContext();

  const { mutate: useMutateSwipeData, isPending } = useMutation({
    mutationFn: (swipeProfileData: SwipeProfileData) =>
      updateSwipeData(swipeProfileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
      closeModal();
      toast.success("uploading succeded");
    },
  });

  return { useMutateSwipeData, isPending };
}
