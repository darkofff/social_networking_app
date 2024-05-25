import { PostData } from "../features/news/NewsTypes";
import { LikeAction } from "../features/posts/postTypes";
import { PostUserData } from "../types/postUserData";
import { supabase } from "./supabaseClient";

export async function addPost({ content, username }: PostData) {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ username: username, content: content }])
    .select();

  if (error) throw new Error("Couldn't send this post");
  console.log(data);
  return data;
}

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("post_id", { ascending: false })
    .range(5 * (pageParam - 1), 5 * pageParam - 1);

  if (error) throw new Error("Couldn't fetch posts");

  return { data, currentPage: pageParam, nextPage: pageParam + 1 };
}

export async function getPostAuthor(username: string) {
  let { data, error } = await supabase
    .from("profiles")
    .select("profile_pic, name, last_name")
    .eq("username", username);

  if (error) throw new Error("Couldn't fetch post user data.");

  const postUserData = data?.at(0) as PostUserData;
  return postUserData;
}

interface IsPostLikedProp {
  post_id: number;
  username: string;
}
export async function isPostLiked({ post_id, username }: IsPostLikedProp) {
  console.log(post_id, username);

  const { data, error } = await supabase
    .from("likes")
    .select("id")
    .eq("username", username)
    .eq("post_id", post_id);

  if (error) throw new Error("Couldn't fetch likes");

  return data.length > 0;
}
export async function likeAction({
  post_id,
  currentUsername,
  isPostLiked,
  user_id,
}: LikeAction) {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
  if (!isPostLiked) {
    const { data, error: incrementError } = await supabase.rpc(
      "increment_score",
      {
        id: post_id,
      },
    );
    if (incrementError) throw new Error("Couldn't like post");
  }
}
