import { useEffect } from "react";
import { useGetUsernames } from "./useGetUsernames";
import { useProfileData } from "../../contexts/ProfileDataContext";
// import {useProfileData} from "../profile/useProfileData";

function PrepareProfiles() {
  // const { data: profileData } = useProfileData();
  const { profileData } = useProfileData();

  const { getUsername } = useGetUsernames();

  useEffect(() => {
    if (profileData) getUsername({ index: 0, username: profileData.username });
  }, []);

  return (
    <div className="z-[9999] flex h-dvh w-full items-center justify-center  ">
      <p className="">Loading Profiles...</p>
    </div>
  );
}

export default PrepareProfiles;
