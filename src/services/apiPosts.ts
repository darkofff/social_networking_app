import { PostData } from "../features/news/NewsTypes";
import { LikeAction } from "../features/posts/postTypes";
import { CommentPost } from "../features/posts/types/CommentPost";
import { PostUserData } from "../types/postUserData";
import { supabase } from "./supabaseClient";

export async function addPost({ content, username }: PostData) {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ username: username, content: content }])
    .select();

  if (error) throw new Error("Couldn't send this post");
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
export async function getInfiniteUserPosts({
  pageParam,
  currentUsername,
}: {
  pageParam: number;
  currentUsername: string;
}) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("username", currentUsername)
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
  return { ...postUserData, username };
}

interface IsPostLikedProp {
  post_id: number;
  username: string;
}
export async function getLikeInfo({ post_id, username }: IsPostLikedProp) {
  const { data: dataLikes, error: likeError } = await supabase
    .from("posts")
    .select("likes")
    .eq("post_id", post_id);

  const likesNumber = dataLikes?.at(0)?.likes;

  if (likeError) throw new Error("Couldn't fetch likes");

  const { data, error } = await supabase
    .from("likes")
    .select("id")
    .eq("username", username)
    .eq("post_id", post_id);

  if (error) throw new Error("Couldn't fetch likes");

  // const

  return { isPostLiked: data.length > 0, likesNumber };
}
export async function likeAction({
  post_id,
  currentUsername,
  isPostLiked,
  user_id,
}: LikeAction) {
  if (!isPostLiked) {
    const { data, error: insertError } = await supabase
      .from("likes")
      .insert({ post_id, user_id, username: currentUsername });

    if (insertError)
      throw new Error("Couldn't connect a post to a user liking");

    const { error: incrementError } = await supabase.rpc("increment_score", {
      id: post_id,
    });
    if (incrementError) throw new Error("Couldn't like post");

    return { currentUsername, post_id };
  }
  if (isPostLiked) {
    //isPostLiked
    const { data, error: deleteError } = await supabase
      .from("likes")
      .delete()
      .eq("post_id", post_id);

    if (deleteError) throw new Error("Couldn't remove a like");

    const { error: decrementError } = await supabase.rpc("decrease_score", {
      id: post_id,
    });
    if (decrementError) throw new Error("Couldn't unlike post");

    return { currentUsername, post_id };
  }
}

export async function sendComment({ post_id, content, username }: CommentPost) {
  console.log(post_id);
  console.log(content);
  console.log(username);

  const { error } = await supabase
    .from("comments")
    .insert({ post_id, sender_username: username, content })
    .select();

  if (error) throw new Error("Couldn't send comment");

  return true;
}
