import { useQuery } from "@tanstack/react-query";
import { getPostAuthor } from "../../../services/apiPosts";

export function usePostAuthor(username: string) {
  const { data: postUserData, isPending } = useQuery({
    queryKey: ["postAuthor", username],
    queryFn: () => getPostAuthor(username),
    refetchInterval: 3600000,
  });
  return { postUserData, isPending };
}
