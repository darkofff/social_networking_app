import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../../services/apiUserData";

function useProfileData() {
  const {
    data = {},
    error,
    isPending,
  } = useQuery({
    queryKey: ["profileData"],
    queryFn: () => getProfileData(),
    refetchInterval: 3600000,
    refetchOnWindowFocus: false,
  });

  return { data, error, isPending };
}

export default useProfileData;