import FriendItem from "./FriendItem";
import useFriendsNameList from "./useFriendsNameList";

interface Props {
  friendsNameList: string[];
}

function FriendsList() {
  const { friendsNameList, isPending, error } = useFriendsNameList();
  return (
    <>
      <h1>Friends</h1>
      <ul className="space-y-1 ">
        {friendsNameList?.map((username) => (
          <FriendItem key={username} username={username} />
        ))}
      </ul>
    </>
  );
}

export default FriendsList;
