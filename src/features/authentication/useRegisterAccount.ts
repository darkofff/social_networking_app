import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAccount as registerAccountApi } from "../../services/userAuth";
import { RegisterData } from "../../types/RegisterData";
import { useNavigate } from "react-router-dom";

export function useRegisterAccount() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["user"]);
  const navigate = useNavigate();

  const user_id: string = data?.id;
  console.log(user_id);
  const { mutate: registerAccount, isPending } = useMutation({
    mutationFn: (data: RegisterData) =>
      registerAccountApi({ user_id, ...data }),
    onSuccess: () => {
      alert("success");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/profile", { replace: true });
    },
    onError: () => {
      alert("Something went wrong");
    },
  });

  return { registerAccount, isPending };
}
