import { useMutation } from "@tanstack/react-query";
import { sendFriendRequest as sendFriendRequestApi } from "../../services/apiFriends";
import { SendFriendRequest } from "./types/SendFriendRequest";
import { useFriendsNames } from "../../contexts/FriendsContext";
import { toast } from "react-toastify";

export function useSendFriendRequest() {
  const { ivalidateFriends } = useFriendsNames();

  const { mutate: sendFriendRequest, isPending } = useMutation({
    mutationFn: ({ username, currentUsername }: SendFriendRequest) =>
      sendFriendRequestApi({ username, currentUsername }),
    onSuccess: (data) => {
      if (data === "match") {
        toast.success("It's a match. User has been added as your friend. ");
        ivalidateFriends();
      }
    },
    onError: () => {
      toast.error("Couldn't send friend request.");
    },
  });

  return { sendFriendRequest, isPending };
}
