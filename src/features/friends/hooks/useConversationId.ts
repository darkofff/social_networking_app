import { useQuery } from "@tanstack/react-query";
import { GetConversationId } from "../FriendsTypes";
import { getConversationId } from "../../../services/apiMessages";

export function useConversationId({
  username_1,
  username_2,
}: GetConversationId) {
  const { data: conversation_id, isPending } = useQuery({
    queryKey: ["conversationId", username_1, username_2],
    queryFn: () => getConversationId({ username_1, username_2 }),
  });
  return { conversation_id, isPending };
}
