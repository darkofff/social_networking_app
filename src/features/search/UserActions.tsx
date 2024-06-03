import { BiHeart, BiHome, BiRightArrowAlt } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetUsernames } from "./useGetUsernames";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { useSendFriendRequest } from "./useSendFriendRequest";
import { useState } from "react";

interface Props {
  username: string;
}

function UserActions({ username }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { sendFriendRequest, isPending: isPendingFriendRequest } =
    useSendFriendRequest();
  const [isLike, setIsLike] = useState<boolean>(false); // is like button red
  const urlIndex = searchParams.get("index");

  const { profileData } = useProfileData();
  const { getUsername, isPending: isPendingUsernamesData } = useGetUsernames();

  function handleNextUser() {
    getUsername({
      index: Number(urlIndex) + 1,
      username: profileData.username,
    });
  }

  function likeUser() {
    sendFriendRequest(
      { username, currentUsername: profileData.username },
      {
        onSuccess: (data) => {
          if (data === "match") {
            setTimeout(() => {
              handleNextUser();
            }, 2000);
          } else {
            setTimeout(() => {
              handleNextUser();
            }, 800);
          }
        },
      },
    );
  }

  return (
    <div className=" flex w-full justify-between gap-4 rounded-lg border border-neutral-400 bg-neutral-300/70 p-1 dark:border-neutral-700 dark:bg-neutral-700">
      <button
        className="flex max-w-36 items-center  justify-center rounded-lg bg-neutral-400/40 p-2 transition-all hover:bg-green-500/40 dark:bg-neutral-600 hover:dark:bg-neutral-500"
        onClick={likeUser}
        disabled={isPendingFriendRequest || isPendingUsernamesData}
      >
        <BiHeart
          className={`h-10 w-10 ${isLike && "text-red-600"}`}
          onClick={() => setIsLike(true)}
        />
      </button>
      <button
        className="flex  max-w-36 justify-center  rounded-lg bg-neutral-400/40 p-2 transition-all hover:bg-green-500/40 dark:bg-neutral-600 hover:dark:bg-neutral-500"
        onClick={() => navigate("/search/menu")}
        disabled={isPendingFriendRequest || isPendingUsernamesData}
      >
        <BiHome className="h-10 w-10" />
      </button>
      <button
        className=" flex max-w-36 justify-center  rounded-lg bg-neutral-400/40 p-2 transition-all hover:bg-green-500/40 dark:bg-neutral-600 hover:dark:bg-neutral-500"
        onClick={handleNextUser}
        disabled={isPendingFriendRequest || isPendingUsernamesData}
      >
        <BiRightArrowAlt className="h-10 w-10 " />
      </button>
    </div>
  );
}

export default UserActions;
