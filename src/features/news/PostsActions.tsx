import { useQueryClient } from "@tanstack/react-query";
import { BiRefresh } from "react-icons/bi";

function PostsActions() {
  const queryClient = useQueryClient();

  return (
    <div className="mb-5 mt-2 flex justify-between rounded-lg bg-neutral-50 p-1 dark:bg-neutral-700">
      <div className="flex items-center  ">
        Sort By: Data BestOf: week, month, year
      </div>
      <div className="space-x-2   ">
        <div
          role="button"
          className="flex w-14 justify-center rounded-lg  transition-all hover:scale-105 hover:text-neutral-800"
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["postsNews"] })
          }
        >
          <BiRefresh className="h-10 w-10" />
        </div>
      </div>
    </div>
  );
}

export default PostsActions;
/* <button
          className="h-full border-2 border-gray-900"
          onClick={() => queryClient.invalidateQueries({ queryKey: ["posts"] })}
        >
          <BiRefresh  />
        </button> */
