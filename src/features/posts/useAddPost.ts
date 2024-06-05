import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost as addPostApi } from "../../services/apiPosts";
import { PostData } from "../news/NewsTypes";
import { toast } from "react-toastify";
import { useProfileData } from "../../contexts/ProfileDataContext";

function useAddPost() {
  const queryClient = useQueryClient();
  const { profileData } = useProfileData();
  const {
    mutate: addPost,
    isPending,
    error,
  } = useMutation({
    mutationFn: (postData: PostData) => addPostApi(postData),
    onSuccess: () => {
      toast.success("Post successfully added!");
      queryClient.invalidateQueries({ queryKey: ["postsNews"] });
      queryClient.invalidateQueries({
        queryKey: ["postUserNews", profileData.username],
      });
    },
  });

  return { addPost, isPending, error };
}

export { useAddPost };
