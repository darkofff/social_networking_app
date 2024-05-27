import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../services/apiAuth";
import { toast } from "react-toastify";

export function useLogout() {
  const QueryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onError: () => toast.error("Couldn't log you out"),
    onSuccess() {
      QueryClient.removeQueries();
      toast.success("You've been logged out");
      navigate("/", { replace: true });
    },
  });
  return { logout, isPending };
}
