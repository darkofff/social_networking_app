import { BiHeart, BiHome, BiRightArrowAlt } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetUsernames } from "./useGetUsernames";
import { useProfileData } from "../../contexts/ProfileDataContext";

function UserActions() {
  const { profileData } = useProfileData();

  const { getUsername, isPending, data } = useGetUsernames();
  const [searchParams] = useSearchParams();

  const urlIndex = searchParams.get("index");

  const navigate = useNavigate();

  function handleNextUser() {
    getUsername({
      index: Number(urlIndex) + 1,
      username: profileData.username,
    });
  }

  return (
    <div className=" flex w-full justify-between gap-4 rounded-lg border border-neutral-400 bg-neutral-300/70 p-1">
      <div className="flex max-w-36 items-center  justify-center rounded-lg bg-neutral-400/40 p-2 transition-all hover:bg-green-500/40">
        <BiHeart className="h-10 w-10 " />
      </div>
      <div
        className="flex  max-w-36 justify-center  rounded-lg bg-neutral-400/40 p-2 transition-all hover:bg-green-500/40"
        onClick={() => navigate("/search/menu")}
      >
        <BiHome className="h-10 w-10" />
      </div>
      <div
        className=" flex max-w-36 justify-center  rounded-lg bg-neutral-400/40 p-2 transition-all hover:bg-green-500/40"
        onClick={handleNextUser}
      >
        <BiRightArrowAlt className="h-10 w-10 " />
      </div>
    </div>
  );
}

export default UserActions;
