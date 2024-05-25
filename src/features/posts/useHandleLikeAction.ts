import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeAction as likeActionApi } from "../../services/apiPosts";
import { LikeAction } from "./postTypes";
import { toast } from "react-toastify";

// interface;

export function useHandleLikeAction() {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(["user"]) as any;

  const user_id = userData.id;

  const {
    mutate: likeAction,
    isPending: isPendingLike,
    error: likeActionError,
  } = useMutation({
    mutationFn: ({ post_id, currentUsername, isPostLiked }: LikeAction) =>
      likeActionApi({
        post_id,
        currentUsername,
        isPostLiked,
        user_id,
      }),
    onError: () =>
      toast.error("There was an error while liking post. Try again later."),
  });

  return { likeAction, isPendingLike, likeActionError };
}
