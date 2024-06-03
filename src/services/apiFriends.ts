import { SendFriendRequest } from "../features/search/types/SendFriendRequest";
import { supabase } from "./supabaseClient";

export async function getFriendsNameList({ username }: { username: string }) {
  // Case 1: username is username_1 in db. In this case
  //select username_2

  const { data: data1, error: error1 } = await supabase
    .from("friends")
    .select("username_2")
    .eq("username_1", username)
    .eq("is_friends_request_confirmed", true);

  if (error1) throw new Error("Coulnd't fetch friend names");
  // Case 2: username is username_1 in db. In this case
  //select username_2
  const { data: data2, error: error2 } = await supabase
    .from("friends")
    .select("username_1")
    .eq("username_2", username)
    .eq("is_friends_request_confirmed", true);
  if (error2) throw new Error("Coulnd't fetch friend names");

  const data = [
    ...data1.map((user) => user.username_2),
    ...data2.map((user) => user.username_1),
  ];

  //const data = [];
  /* for (let user of data1) {
    data.push(user.username_2);
  }
  for (let user of data2) {
    data.push(user.username_1);
  } */
  return data;
}

export async function sendFriendRequest({
  currentUsername,
  username,
}: SendFriendRequest) {
  // username - user that is currently displayed as a suggestion
  // currentUsername - username of currently logged in user
  // username_1 is always user who sent request first

  // 1.Check if other user already sent friend request

  const { data: data1, error: errorCase1 } = await supabase
    .from("friends")
    .select("is_friends_request_confirmed")
    .eq("username_1", username)
    .eq("username_2", currentUsername);
  if (errorCase1)
    throw new Error("Couldn't  check if there is friend request already");

  if (data1.at(0)?.is_friends_request_confirmed === false) {
    // It should never happen that the is_friends_request_confirmed === true here but in case there is additional check for that

    const { data, error } = await supabase
      .from("friends")
      .update({ is_friends_request_confirmed: true })
      .eq("username_1", username)
      .eq("username_2", currentUsername);
    if (error) throw new Error("Couldn't set user as a friend");

    return "match";
  }

  // 1.5. Check if currently logged in user sent request before but it's still pending
  const { data: data2, error: errorCase2 } = await supabase
    .from("friends")
    .select("is_friends_request_confirmed")
    .eq("username_1", currentUsername)
    .eq("username_2", username);
  if (errorCase2)
    throw new Error("Couldn't check if there is friend request already");

  if (data2.at(0)?.is_friends_request_confirmed === false) {
    return "pending";
  }

  // 2.If there is no pending friend request set one
  const { error: sendFriendRequestError } = await supabase
    .from("friends")
    .insert({
      username_1: currentUsername,
      username_2: username,
    });
  if (sendFriendRequestError) throw new Error("Couldn't send friend request");

  return "sent";
}
