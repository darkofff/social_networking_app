import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getProfile } from "../../services/apiSearchProfiles";

interface RouteParams {
  username: string;
}

function useGetSwipeProfile() {
  const queryClient = useQueryClient();
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
