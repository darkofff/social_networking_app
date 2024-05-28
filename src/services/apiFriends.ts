import { supabase } from "./supabaseClient";

export async function getFriendsNameList({ username }: { username: string }) {
  // Case 1: username is username_1 in db. In this case
  //select username_2
  const { data: data1, error: error1 } = await supabase
    .from("friends")
    .select("username_2")
    .eq("username_1", username);

  if (error1) throw new Error("Coulnd't fetch friend names");
  // Case 2: username is username_1 in db. In this case
  //select username_2
  const { data: data2, error: error2 } = await supabase
    .from("friends")
    .select("username_1")
    .eq("username_2", username)
    .eq("is_friends_request_confirmed", true);
  if (error2) throw new Error("Coulnd't fetch friend names");

  let data = [];

  for (let user of data1) {
    data.push(user.username_2);
  }
  for (let user of data2) {
    data.push(user.username_1);
  }
  return data;
}
