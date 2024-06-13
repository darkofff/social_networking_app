import { useMutation } from "@tanstack/react-query";
import { sendComment as sendCommentApi } from "../../../services/apiPosts";
import { CommentPost } from "../types/CommentPost";
import { toast } from "react-toastify";

export function useSendComment() {
  const { mutate: sendComment, isPending } = useMutation({
    mutationFn: ({ post_id, content, username }: CommentPost) =>
      sendCommentApi({ post_id, content, username }),

    onSuccess: () => {
      alert("INVALIDATE COMMENTS!!!");
    },
    onError: () => toast.error("Couldn't send comment."),
  });

  return { sendComment, isPending };
}
