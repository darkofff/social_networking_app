import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/userAuth";

export function useUser() {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
    refetchInterval: 3600000,
    refetchOnWindowFocus: false,
  });

  return {
    user,
    isLoading,
    is_registration_complete: user?.is_registration_complete,
    error,
    isAuth: user?.role === "authenticated",
  };
}
