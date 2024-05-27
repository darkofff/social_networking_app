import { useQuery } from "@tanstack/react-query";
import { getLikeInfo } from "../../services/apiPosts";

// interface ReceivedData{
//   isPostLiked:
// }

export function useGetUserPostInfo(currentUsername: string, post_id: number) {
  const { data, error, isPending } = useQuery({
    queryKey: ["isPostLiked", post_id, currentUsername],
    queryFn: () => getLikeInfo({ post_id, username: currentUsername }),
  });

  return {
    isPostLiked: data?.isPostLiked,
    likesNumber: data?.likesNumber,
    error,
    isPending,
  };
}
