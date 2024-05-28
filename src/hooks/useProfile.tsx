import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/apiUserData";

export function useProfile(username: string) {
  const { data: profile, isPending } = useQuery({
    queryKey: ["profileData", username],
    queryFn: () => getProfile({ username }),
    refetchInterval: 3600000,
    refetchOnWindowFocus: false,
  });
  return { profile, isPending };
}
