import { useMutation } from "@tanstack/react-query";
import { CreateAccData } from "../../types/CreateAccData";

import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useCreateAccount() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: (formData: CreateAccData) => signupApi(formData),
    onSuccess: () => toast.info("confirm you email"),
    onError: () => toast.error("Could not create new account"),
  });

  return { signup, isPending };
}
