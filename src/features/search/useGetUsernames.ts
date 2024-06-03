import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsername as getUsernameApi } from "../../services/apiSearchProfiles";
import { GetUsername } from "./types/searchTypes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFriendsNames } from "../../contexts/FriendsContext";

export function useGetUsernames() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { friendsNameList } = useFriendsNames();

  const {
    mutate: getUsername,
    isPending,
    data,
  } = useMutation({
    mutationFn: ({ index, username: currentUserUsername }: GetUsername) =>
      getUsernameApi({ index, currentUserUsername, friendsNameList }),
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["swipeData"] });

      if (data.index === -1) {
        navigate(`/search/lastSlide`, {
          replace: true,
        });
      } else {
        navigate(`/search/${data.currentUsername}?index=${data.index}`, {
          replace: true,
        });
      }
    },
    onError: () => {
      toast.warn(
        "Something went wront with fetching data. Please try again later.",
      );

      navigate("/profile");
    },
  });

  return { getUsername, isPending, data };
}
