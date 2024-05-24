import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsername as getUsernameApi } from "../../services/apiSearchProfiles";
import { GetUsername } from "./searchTypes";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export function useGetUsernames() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [currentUsername, setCurrentUsername] = useState();

  const {
    mutate: getUsername,
    isPending,
    data,
  } = useMutation({
    mutationFn: ({ index, username: currentUserUsername }: GetUsername) =>
      getUsernameApi({ index, currentUserUsername }),
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["swipeData"] });
      navigate(`/search/${data.currentUsername}?index=${data.index}`, {
        replace: true,
      });
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
