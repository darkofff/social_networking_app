import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../../services/apiUserData";
import { useSearchParams } from "react-router-dom";



function useProfileData() {
  const [searchParams] = useSearchParams();

  let username = searchParams.get("username");

  const {
    data = {},
    error,
    isPending,
  } = useQuery({
    queryKey: ["profileData", username],
    queryFn: () => getProfileData(username),
    refetchInterval: 3600000,
    refetchOnWindowFocus: false,
  });
  const isSpectatorMode = username !== null;

  return { data, username: data.username, error, isPending, isSpectatorMode };
}

export default useProfileData;
