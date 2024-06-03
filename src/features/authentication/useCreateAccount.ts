import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateAccData } from "../../types/CreateAccData";

import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useModalOpenContext } from "../../contexts/ModalOpenContext";

export function useCreateAccount() {
  const { closeModal } = useModalOpenContext();
  const queryClient = useQueryClient();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: (formData: CreateAccData) => signupApi(formData),
    onSuccess: () => {
      toast.info("You may now login");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      closeModal();
    },
    onError: () => toast.error("Could not create new account"),
  });

  return { signup, isPending };
}
