import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useGetUserPostInfo } from "./hooks/useGetUserPostInfo";
import { BiCommentDetail } from "react-icons/bi";
import { useState } from "react";

import PostComment from "./PostComment";
import { useHandleLikeAction } from "./hooks/useHandleLikeAction";
interface Props {
  username: string;
  likes: number;
  post_id: number;
  currentUsername: string;
  last_name: string;
  name: string;
}

function PostActions({
  username,
  post_id,
  currentUsername,
  last_name,
  name,
}: Props) {
  const { isPostLiked, likesNumber, isPending, error } = useGetUserPostInfo(
    currentUsername,
    post_id,
  );

  const [isPostOpen, setIsPostOpen] = useState<boolean>(false);

  //const isEditAllowed = currentUsername === username;

  const { likeAction, isPendingLike } = useHandleLikeAction();

  async function handleLikeDislike() {
    if (isPostLiked === undefined || isPendingLike) return;
    likeAction({ post_id, currentUsername, isPostLiked });
  }

  return (
    <>
      <div className="flex justify-between space-x-4 rounded-b-lg     sm:space-x-8 ">
        <div className="flex items-center gap-2">
          {isPostLiked && !isPending ? (
            <button
              onClick={handleLikeDislike}
              disabled={isPendingLike}
              className="cursor-pointer transition-all hover:[&>*]:scale-105"
            >
              <AiFillLike className="h-7 w-7 rounded-lg text-green-900/70 dark:text-green-400 md:h-8 md:w-8" />
            </button>
          ) : (
            <button
              role="button"
              onClick={handleLikeDislike}
              disabled={isPendingLike}
              className="cursor-pointer transition-all hover:[&>*]:scale-105"
            >
              <AiOutlineLike className="h-7 w-7 rounded-lg text-neutral-800 dark:text-neutral-300 md:h-8 md:w-8" />
            </button>
          )}
          <p>{likesNumber}</p>
        </div>
        <div className="flex gap-2">
          <div
            className="transition-all hover:[&>*]:scale-105"
            role="button"
            onClick={() => setIsPostOpen((value) => !value)}
          >
            <BiCommentDetail className="h-7 w-7 rounded-lg text-neutral-800 dark:text-neutral-300  md:h-8 md:w-8" />
          </div>
        </div>
      </div>

      {isPostOpen && (
        <PostComment
          last_name={last_name}
          name={name}
          post_id={post_id}
          currentUsername={currentUsername}
          authorUsername={username}
        />
      )}
    </>
  );
}

export default PostActions;
