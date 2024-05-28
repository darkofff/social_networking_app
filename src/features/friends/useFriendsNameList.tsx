import { useQuery } from "@tanstack/react-query";
import { getFriendsNameList } from "../../services/apiFriends";
import useProfileData from "../profile/useProfileData";

function useFriendsNameList() {
  const { username } = useProfileData();

  const {
    data: friendsNameList,
    isPending,
    error,
  } = useQuery({
    queryKey: ["friendsNameList", username],
    queryFn: () => getFriendsNameList({ username }),
  });
  return{friendsNameList, isPending, error}
}

export default useFriendsNameList;
