import { useMutation } from "@tanstack/react-query";
import { CreateAccData } from "../../types/CreateAccData";

import { signup as signupApi } from "../../services/userAuth";

export function useCreateAccount() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: (formData: CreateAccData) => signupApi(formData),
    onSuccess: () => alert("confirm you email"),
    onError: () => alert("Could not create new account"),
  });

  return { signup, isPending };
}
