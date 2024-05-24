import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginWithPassword } from "../../services/apiAuth";
import { LoginData } from "../../types/LoginData";
import { toast } from "react-toastify";

export function useLogin() {
  const QueryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (formData: LoginData) => loginWithPassword(formData),
    onSuccess: (data) => {
      QueryClient.setQueryData(["user"], data);
    },

    onError: (err) =>
      toast.error("Could not log you in. Try again later. " + err.message),
  });

  return { login, isPending };
}
