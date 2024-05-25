import { useQuery } from "@tanstack/react-query";
import { isPostLiked as isPostLikedApi } from "../../services/apiPosts";

export function useGetUserPostInfo(currentUsername: string, post_id: number) {
  const {
    data: isPostLiked,
    error,
    isPending,
  } = useQuery({
    queryKey: ["isPostLiked", post_id, currentUsername],
    queryFn: () => isPostLikedApi({ post_id, username: currentUsername }),
  });

  return { isPostLiked, error, isPending };
}
