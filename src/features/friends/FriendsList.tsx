import FriendItem from "./FriendItem";
import useFriendsNameList from "./hooks/useFriendsNameList";

interface Props {
  friendsNameList: string[];
}

function FriendsList() {
  const { friendsNameList, isPending, error } = useFriendsNameList();
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
