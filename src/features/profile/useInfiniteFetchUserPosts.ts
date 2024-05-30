import { useInfiniteQuery } from "@tanstack/react-query";
import { getInfiniteUserPosts } from "../../services/apiPosts";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function useInfiniteFetchUserPosts(currentUsername: string) {
  const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["postsUserNews", currentUsername],
    queryFn: ({ pageParam }) =>
      getInfiniteUserPosts({ pageParam, currentUsername }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length === 0) return undefined;
      return lastPage.nextPage;
    },
    refetchInterval: 1200000,
  });

  const { ref: intersectionRef, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  return { data, status, error, intersectionRef, fetchNextPage, hasNextPage };
}
