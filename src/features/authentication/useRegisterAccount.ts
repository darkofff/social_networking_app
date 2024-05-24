import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAccount as registerAccountApi } from "../../services/apiAuth";
import { RegisterData } from "../../types/RegisterData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useRegisterAccount() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["user"]) as any;
  const navigate = useNavigate();

  const user_id = data?.id;
  console.log(user_id);
  const { mutate: registerAccount, isPending } = useMutation({
    mutationFn: (data: RegisterData) =>
      registerAccountApi({ user_id, ...data }),
    onSuccess: () => {
      toast.success("success");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/profile", { replace: true });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { registerAccount, isPending };
}
