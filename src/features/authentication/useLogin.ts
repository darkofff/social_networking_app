import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginWithPassword } from "../../services/userAuth";
import { LoginData } from "../../types/LoginData";

export function useLogin() {
  const QueryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (formData: LoginData) => loginWithPassword(formData),
    onSuccess: (data) => {
      QueryClient.setQueryData(["user"], data);
     
    },

    onError: (err) =>
      alert("Could not log you in. Try again later. " + err.message),
  });

  return { login, isPending };
}
