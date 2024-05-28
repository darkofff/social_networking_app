import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  last_name: string;
  profile_pic: string;
  username: string;
}

function ChatTop({ name, last_name, profile_pic, username }: Props) {
  const navigate = useNavigate();

  function goBackToFriends() {
    navigate("/friends");
  }

  return (
    <div className="flex items-center gap-1 border  bg-neutral-200 px-2 py-1">
      <div
        className="mr-4 flex h-12 w-12 items-center justify-center [&>*]:hover:scale-105"
        onClick={goBackToFriends}
      >
        <BiLeftArrowAlt className="h-10 w-10 transition-all" />
      </div>
      <div
        className="h-12 w-12 rounded-full bg-neutral-300 bg-cover bg-center"
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
    </div>
  );
}

export default ChatTop;
