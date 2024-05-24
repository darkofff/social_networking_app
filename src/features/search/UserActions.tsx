import { BiHeart, BiHome, BiRightArrowAlt } from "react-icons/bi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetUsernames } from "./useGetUsernames";
import useProfileData from "../profile/useProfileData";

function UserActions() {
  const { data: profileData } = useProfileData();
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
    <div className=" flex w-full justify-around gap-2 rounded-lg bg-neutral-400/50 p-1">
      <div className=" flex max-w-36 grow justify-center rounded-lg bg-green-100/50 p-2">
        <BiHeart className="h-10 w-10" />
      </div>
      <div
        className=" flex max-w-36 grow justify-center rounded-lg bg-green-100/50 p-2"
        onClick={() => navigate("/search/menu")}
      >
        <BiHome className="h-10 w-10" />
      </div>
      <div
        className=" flex max-w-36 grow justify-center rounded-lg bg-green-100/50 p-2"
        onClick={handleNextUser}
      >
        <BiRightArrowAlt className="h-10 w-10" />
      </div>
    </div>
  );
}

export default UserActions;
