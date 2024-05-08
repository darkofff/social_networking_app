import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../../services/menageData";

function useProfileData() {
  console.log("NOT PLZ");
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

  return { data , error, isPending };
}

export default useProfileData;
