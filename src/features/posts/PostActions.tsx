import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";

import { MdEditDocument } from "react-icons/md";
import useEditPost from "./useEditPost";
import { supabase } from "../../services/supabaseClient";

interface Porps {
  username: string;
  likes: number;
  post_id: number;
}

function PostActions({ username, likes, post_id }: Porps) {
  const isEditAllowed = useEditPost(username);

  async function increaseLikes() {
    alert(post_id);
    const { data, error } = await supabase.rpc("increment_score", {
      id: post_id,
    });
    if (error) alert(error.message);
    //column reference "post_id" is ambiguous
  }

  return (
    <div className="flex justify-between space-x-4 rounded-b-lg     sm:space-x-8 ">
      <div className="flex items-center gap-2">
        <AiOutlineLike
          className="h-7 w-7 rounded-lg text-neutral-800 dark:text-neutral-300 md:h-8 md:w-8"
          onClick={increaseLikes}
        />
        <AiFillLike className="h-7 w-7 rounded-lg text-green-900/70 dark:text-green-400 md:h-8 md:w-8" />

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
