import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost as addPostApi } from "../../services/apiPosts";
import { PostData } from "../news/NewsTypes";
import { toast } from "react-toastify";

function useAddPost() {
  const queryClient = useQueryClient();

  const {
    mutate: addPost,
    isPending,
    error,
  } = useMutation({
    mutationFn: (postData: PostData) => addPostApi(postData),
    onSuccess: () => {
      toast.success("Post successfuly added!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return { addPost, isPending, error };
}

export { useAddPost };
