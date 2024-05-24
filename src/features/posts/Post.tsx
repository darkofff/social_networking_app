import { useState } from "react";
import { usePostAuthor } from "./usePostAuthor";
import { PostUserData } from "../../types/postUserData";
import PostActions from "./PostActions";

interface Post {
  content: string;
  username: string;
  likes: number;
  post_id: number;
}

function Post({ content, username, likes, post_id }: Post) {
  const [isPostExpanded, setIsPostExpanded] = useState(() => content);

  const { postUserData, isPending } = usePostAuthor(username);

  if (isPending) return <p>Loading...</p>;

  const { last_name, name, profile_pic } = postUserData as PostUserData;

  return (
    <div className="mb-5 flex flex-col rounded-lg bg-neutral-50 p-2 shadow-sm dark:bg-neutral-700  md:p-4    ">
      <div className="rounded-t-lg    ">
        <div className="flex items-center space-x-2">
          <div
            className="h-11 w-11 rounded-full bg-red-200 bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                profile_pic ? profile_pic : "anonymous/profile_pic_anon.png"
              })`,
            }}
          ></div>
          <div>
            <div className="text-lg font-semibold">
              {name} {last_name}
            </div>
            <div className="text-sm">@{username}</div>
          </div>
        </div>
        <pre className="mx-auto w-full max-w-[812px] text-wrap py-2 font-LibreFranklin  dark:text-neutral-100">
          {content}
        </pre>
        <div className="mx-auto my-2 h-[1px] w-[95%] bg-slate-300 dark:bg-neutral-500 md:my-4"></div>
      </div>
      <PostActions username={username} likes={likes} post_id={post_id} />
    </div>
  );
}

export default Post;
