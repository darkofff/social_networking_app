import { useNavigate } from "react-router-dom";
import { useGetProfileByUsername } from "../../hooks/useGetProfileByUsername";
import { ProfileData } from "../../types/ProfileData";

interface Props {
  username: string;
}
function FriendItem({ username }: Props) {
  const { profileData, isPending } = useGetProfileByUsername(username);
  const navigate = useNavigate();

  let name, last_name, profile_pic;
  if (!isPending)
    ({ name, last_name, profile_pic } = profileData as ProfileData);

  function openChat() {
    navigate(`/friends/${username}`);
  }

  return (
    <li className=" w-full cursor-pointer" onClick={openChat}>
      <div className="flex w-full gap-2 rounded-lg bg-neutral-200/30 px-2 py-1 transition-all hover:bg-neutral-200/70 dark:bg-neutral-600 dark:text-neutral-100">
        {isPending ? (
          "Loading..."
        ) : (
          <>
            <div
              className="h-12 w-12 rounded-full bg-neutral-50 bg-cover bg-center"
              style={{
                backgroundImage: `url(${profile_pic || "/anonymous/profile_pic_anon.png"})`,
              }}
            ></div>
            <div>
              <div className="font-semibold">
                {name} {last_name}
              </div>
              <div>@{username}</div>
            </div>
          </>
        )}
      </div>
    </li>
  );
}

export default FriendItem;
/* 
bgc_pic
bio
bio_swipe
id
image_1
image_2
image_3
image_4
image_5
image_6
is_profile_created
last_name
name
profile_pic
username
*/
