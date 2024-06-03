import { useFriendsNames } from "../../contexts/FriendsContext";
import FriendItem from "./FriendItem";

function FriendsList() {
  const { friendsNameList, isPending } = useFriendsNames();

  return (
    <>
      <h1 className="py-2 text-2xl">Friends</h1>
      <ul className="space-y-1 ">
        {friendsNameList?.map((username) => (
          <FriendItem key={username} username={username} />
        ))}
      </ul>
    </>
  );
}

export default FriendsList;
