import { createContext, useContext } from "react";
import { ChildrenProp } from "../types/ChildrenProp";
import { ProfileData } from "../types/ProfileData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../services/apiUserData";

interface Context {
  profileData: ProfileData;
  invalidateProfileData: () => Promise<void>;
}

const ProfileDataContext = createContext<Context | null>(null);

function ProfileDataProvider({ children }: ChildrenProp) {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["user"]) as any;
  const user_id = data.id;

  const { data: profileData, isPending } = useQuery({
    queryKey: ["profileData", user_id],
    queryFn: () => getCurrentUserProfile(user_id),
    refetchInterval: 3600000,
    refetchOnWindowFocus: false,
  });

  const invalidateProfileData = () =>
    queryClient.invalidateQueries({
      queryKey: ["profileData", user_id],
    });

  if (isPending) return <p>Loading...</p>;

  return (
    <ProfileDataContext.Provider value={{ profileData, invalidateProfileData }}>
      {children}
    </ProfileDataContext.Provider>
  );
}

function useProfileData() {
  const context = useContext(ProfileDataContext);
  if (!context)
    throw new Error("ProfileData context used outside of it's scope");
  return context;
}

export { ProfileDataProvider, useProfileData };
