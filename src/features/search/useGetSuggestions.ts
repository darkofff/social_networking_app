import { useQuery } from "@tanstack/react-query";
import { getProfiles } from "../../services/getProfiles";

export function useGetSuggestions() {
  console.log("im here");

  const { data: profiles, isPending } = useQuery({
    queryKey: ["suggestions"],
    queryFn: getProfiles,
  });

  return { profiles, isPending };
}
