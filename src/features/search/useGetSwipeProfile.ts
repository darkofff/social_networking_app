import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProfile } from "../../services/apiSearchProfiles";

interface RouteParams {
  username: string;
}

function useGetSwipeProfile() {
  const { username } = useParams();

  const {
    data: swipeData,
    error,
    isPending,
  } = useQuery({
    queryKey: ["swipeData", username],
    queryFn: () => getProfile({ username }),
  });

  return { swipeData, error, isPending };
}

export { useGetSwipeProfile };
