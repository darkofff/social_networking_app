import { createContext, useContext } from "react";
import { useProfileData } from "./ProfileDataContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFriendsNameList } from "../services/apiFriends";
import { ChildrenProp } from "../types/ChildrenProp";

interface FriendsNameList {
  friendsNameList: any[] | undefined;
  isPending: boolean;
  ivalidateFriends: () => Promise<void>;
}

const FriendsContext = createContext<FriendsNameList | null>(null);

function FriendsProvider({ children }: ChildrenProp) {
  const queryClient = useQueryClient();

  const {
    profileData: { username },
  } = useProfileData();

  const {
    data: friendsNameList,
    isPending,
    error,
  } = useQuery({
    queryKey: ["friendsNameList", username],
    queryFn: () => getFriendsNameList({ username }),
  });

  const ivalidateFriends = () =>
    queryClient.invalidateQueries({
      queryKey: ["friendsNameList", username],
    });

  return (
    <FriendsContext.Provider
      value={{ friendsNameList, isPending, ivalidateFriends }}
    >
      {children}
    </FriendsContext.Provider>
  );
}

function useFriendsNames() {
  const context = useContext(FriendsContext);
  if (!context) throw new Error("useFriendsList used outside context");
  return context;
}

export { FriendsProvider, useFriendsNames };
