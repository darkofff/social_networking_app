import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";

import { MdEditDocument } from "react-icons/md";
import { supabase } from "../../services/supabaseClient";
import { useGetUserPostInfo } from "./useGetUserPostInfo";
import { toast } from "react-toastify";
import { useHandleLikeAction } from "./useHandleLikeAction";

interface Porps {
  username: string;
  likes: number;
  post_id: number;
  currentUsername: string;
}

function PostActions({ username, likes, post_id, currentUsername }: Porps) {
  const { isPostLiked, isPending, error } = useGetUserPostInfo(
    currentUsername,
    post_id,
  );
  const isEditAllowed = currentUsername === username;

  const { likeAction, isPendingLike, likeActionError } = useHandleLikeAction();

  async function handleLikeDislike() {
    if (isPostLiked === undefined) return;
    likeAction({ post_id, currentUsername, isPostLiked });
  }

  return (
    <div className="flex justify-between space-x-4 rounded-b-lg     sm:space-x-8 ">
      <div className="flex items-center gap-2">
        {isPostLiked ? (
          <AiFillLike
            className="h-7 w-7 rounded-lg text-green-900/70 dark:text-green-400 md:h-8 md:w-8"
            onClick={handleLikeDislike}
          />
        ) : (
          <AiOutlineLike
            className="h-7 w-7 rounded-lg text-neutral-800 dark:text-neutral-300 md:h-8 md:w-8"
            onClick={handleLikeDislike}
          />
        )}
        {!!(isPending || error) && (
          <AiOutlineLike
            className="h-7 w-7 rounded-lg text-neutral-800 dark:text-neutral-300 md:h-8 md:w-8"
            onClick={() =>
              toast.warn("Can't like this post. Try refreshing the page")
            }
          />
        )}

        <p>{likes}</p>
      </div>
      <div className="flex gap-2">
        <BiCommentDetail className="h-7 w-7 rounded-lg text-neutral-800 dark:text-neutral-300  md:h-8 md:w-8" />
        {!!isEditAllowed && (
          <MdEditDocument className="h-7 w-7 rounded-lg text-neutral-800 dark:text-neutral-300 md:h-8 md:w-8" />
        )}
      </div>
    </div>
  );
}

export default PostActions;
