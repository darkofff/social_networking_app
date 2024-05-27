import Post from "../posts/Post";
import { useInfiniteFetchUserPosts } from "./useInfiniteFetchUserPosts";

interface Props {
  currentUsername: string;
  isPendingProfileData: boolean;
}

function DisplayUserPosts({ currentUsername, isPendingProfileData }: Props) {
  
  const { data, status, error, intersectionRef, hasNextPage } =
    useInfiniteFetchUserPosts(currentUsername);

  return (
    <div className="mt-2">
      {status === "pending" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>{error?.message}</div>
      ) : (
        <div>
          {data?.pages.map((page) => (
            <div key={page.currentPage}>
              {page.data.map((post) => (
                <Post
                  key={post.post_id}
                  username={post.username}
                  currentUsername={currentUsername}
                  content={post.content}
                  likes={post.likes}
                  post_id={post.post_id}
                />
              ))}
            </div>
          ))}
        </div>
      )}
      {!hasNextPage && (
        <h1 className="text-xl font-semibold dark:text-red-300">
          That's it. There are no more posts to see.
        </h1>
      )}
      <div ref={intersectionRef}></div>
    </div>
  );
}

export default DisplayUserPosts;
