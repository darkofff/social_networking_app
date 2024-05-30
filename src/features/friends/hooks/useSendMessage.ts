import { useMutation } from "@tanstack/react-query";

import { SendMessage } from "./../FriendsTypes";
import { sendMessage as SendMessageApi } from "../../../services/apiMessages";

export function useSendMessage() {
  const {
    mutate: sendMessage,
    data,
    isPending,
  } = useMutation({
    mutationFn: ({ conversation_id, currentUsername, content }: SendMessage) =>
      SendMessageApi({ conversation_id, currentUsername, content }),
  });

  return { sendMessage, data, isPending };
}
