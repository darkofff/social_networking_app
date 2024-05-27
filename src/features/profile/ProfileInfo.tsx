import UpdateProfileModal from "./UpdateProfileModal";
import { useState } from "react";

interface Props {
  profileData: any;
  isPendingProfileData: boolean;
}

function ProfileInfo({ profileData }: Props) {
  const [nameEdit, isNameEdit] = useState<boolean>(false);
  const [lastNameEdit, isLastNameEdit] = useState<boolean>(false);

  const { bgc_pic, profile_pic, username, name, last_name, bio } = profileData;
  const dataToUpdate = { bgc_pic, profile_pic, username, name, last_name, bio };

  return (
    <div className="border-b-2 pb-2">
      <div
        className="aspect-[21/9] bg-cyan-50 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgc_pic ? bgc_pic : "anonymous/bgc_pic_anon.png"} )`,
        }}
      ></div>
      <div className="px-2 lg:px-4">
        <div className="relative mb-1  min-h-14  sm:h-16 md:h-20 lg:h-24">
          <div
            className=" absolute aspect-square w-28 -translate-y-1/2 rounded-full border-4 border-neutral-100 bg-lime-800 bg-cover bg-center dark:border-neutral-800 dark:shadow-md dark:shadow-neutral-100/10 sm:w-32 md:w-40 lg:w-48"
            style={{
              backgroundImage: `url(${profile_pic ? profile_pic : "anonymous/profile_pic_anon.png"} )`,
            }}
          ></div>
          <div className="flex w-full justify-end">
            <div className="w-40 sm:w-48 md:w-52">
              <UpdateProfileModal dataToUpdate={dataToUpdate} />
            </div>
          </div>
        </div>
        <div className="min-h-10 space-y-2 pl-2">
          <div className="">
            <div className="text-2xl font-semibold tracking-wide">
              {name} {last_name}
            </div>
            <div className="text-md ">@{username}</div>
          </div>
          <div className="text-xl font-medium">{bio}</div>
          <div>Jakieś info. Liczba postów, znajomych czy coś takiego</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
