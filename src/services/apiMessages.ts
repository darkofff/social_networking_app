import {
  GetConversationId,
  SendMessage,
} from "../features/friends/FriendsTypes";
import { supabase } from "./supabaseClient";

export async function getConversationId({
  username_1,
  username_2,
}: GetConversationId) {
  const { data: dataCase1, error: errorCase1 } = await supabase
    .from("friends")
    .select("conversation_id")
    .eq("username_1", username_1)
    .eq("username_2", username_2);

  if (errorCase1) throw new Error("Coulnd't get data");

  const { data: dataCase2, error: errorCase2 } = await supabase
    .from("friends")
    .select("conversation_id")
    .eq("username_1", username_2)
    .eq("username_2", username_1);

  if (errorCase2) throw new Error("Coulnd't get data");

  const conversation_id =
    dataCase1.at(0)?.conversation_id || dataCase2.at(0)?.conversation_id;
  return conversation_id;
}

export async function sendMessage({
  conversation_id,
  currentUsername,
  content,
}: SendMessage) {
  console.log(conversation_id, currentUsername, content);

  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversation_id,
      sender_username: currentUsername,
      content: content,
    })
    .select();
  /* 
const { data, error } = await supabase
  .from('messages')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
  ])
  .select()
*/

  if (error) throw new Error(error.message);
  return data;
}

interface GetMessages {
  conversation_id: number;
  pageParam: number;
}

export async function getMessages({ conversation_id, pageParam }: GetMessages) {
  let { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversation_id)
    .order("message_id", { ascending: false })
    .range(10 * (pageParam - 1), 10 * pageParam - 1);
  if (error) throw new Error("Couldn't fetch messages");

  console.log(messages);

  return { messages, currentPage: pageParam, nextPage: pageParam + 1 };
}
/* 
export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("post_id", { ascending: false })
    .range(5 * (pageParam - 1), 5 * pageParam - 1);

  if (error) throw new Error("Couldn't fetch posts");

  return { data, currentPage: pageParam, nextPage: pageParam + 1 };
}
*/
