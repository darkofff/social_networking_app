import { GetUsername } from "../features/search/types/searchTypes";
import { supabase } from "./supabaseClient";

export async function getProfiles() {
  let { data: profiles, error } = await supabase.from("profiles").select("*");
  if (error) throw new Error("Couldn' load users ");

  return profiles;
}

export async function getUsername({
  index,
  currentUserUsername,
  friendsNameList,
}: GetUsername) {
  let loopBreaker = false;
  let data, error;
  while (!loopBreaker) {
    // 2.Fetch next swipe username
    ({ data, error } = (await supabase
      .from("profiles")
      .select("username")
      .not("username", "eq", currentUserUsername) // Exclude users own profile
      .order("id", { ascending: true })
      .range(index, index)) as any);

    if (error) {
      throw new Error("Couldn't fetch new profile");
    }

    if (data.length === 0) {
      return { currentUsername: "", index: -1 };
    }

    // So if here then there is data
    // Code below check if fetched user is a friend
    // If so fetch once again else break loop

    if (friendsNameList?.includes(data.at(0).username)) {
      index++;
    } else {
      loopBreaker = true;
    }
  }

  const currentUsername = data?.at(0).username;

  return { currentUsername, index };
}

interface GetProfileProps {
  username: string | undefined;
}

export async function getProfile({ username }: GetProfileProps) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username);

  if (error) throw new Error("Couldn't fetch user data");

  return data.at(0);
}


