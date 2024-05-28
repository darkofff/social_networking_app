import { useState } from "react";
import { usePostAuthor } from "./usePostAuthor";
import { PostUserData } from "../../types/postUserData";
import PostActions from "./PostActions";
import { useNavigate } from "react-router-dom";

interface Post {
  content: string;
  username: string;
  likes: number;
  post_id: number;
  currentUsername: string;
}

function Post({ content, username, likes, post_id, currentUsername }: Post) {
  const [isPostExpanded, setIsPostExpanded] = useState(() => content);
  const navigate = useNavigate();
  const { postUserData, isPending } = usePostAuthor(username);

  // if (isPending) return <p>Loading...</p>;
  let last_name: string;
  let name: string;
  let profile_pic: string;
  if (!isPending) {
    ({ last_name, name, profile_pic } = postUserData as PostUserData);
  }

  function handleProfileClick() {
    navigate(`/profile?username=${postUserData.username}`);
  }

  return (
    <div className="mb-5 flex flex-col rounded-lg bg-neutral-50 p-2 shadow-sm dark:bg-neutral-700  md:p-4    ">
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="rounded-t-lg  ">
            <div className="flex items-center space-x-2 ">
              <div
                className="h-11 w-11 cursor-pointer rounded-full bg-red-200 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${
                    profile_pic ? profile_pic : "anonymous/profile_pic_anon.png"
                  })`,
                }}
                onClick={handleProfileClick}
              ></div>
              <div>
                <div
                  className="cursor-pointer text-lg font-semibold"
                  onClick={handleProfileClick}
                >
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
          <PostActions
            username={username}
            currentUsername={currentUsername}
            likes={likes}
            post_id={post_id}
          />
        </>
      )}
    </div>
  );
}

export default Post;
