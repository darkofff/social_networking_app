import { useQuery } from "@tanstack/react-query";
import { getProfileByUsername } from "../services/apiUserData";

export function useGetProfileByUsername(username: string) {
  const { data: profileData, isPending } = useQuery({
    queryKey: ["profileData", username],
    queryFn: () => getProfileByUsername({ username }),
    refetchInterval: 3600000,
    refetchOnWindowFocus: false,
  });
  return { profileData, isPending };
}
