import { useQuery } from "@tanstack/react-query";
import { useProfileData } from "../../../contexts/ProfileDataContext";
import { getFriendsNameList } from "../../../services/apiFriends";

function useFriendsNameList() {
  const {
    profileData: { username },
  } = useProfileData();

  const {
    data: friendsNameList,
    isPending,
    error,
  } = useQuery({
    queryKey: ["friendsNameList", username],
    queryFn: () => getFriendsNameList ({ username }),
  });
  return { friendsNameList, isPending, error };
}

export default useFriendsNameList;
