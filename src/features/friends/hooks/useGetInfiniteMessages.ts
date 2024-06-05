import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "../../../services/apiMessages";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export function useGetInfiniteMessages(conversation_id: number) {
  const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["messages", conversation_id],
    queryFn: ({ pageParam = 1 }) => getMessages({ conversation_id, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.messages?.length === 0) {
        return undefined;
      }

      return lastPage.nextPage;
    },
    refetchInterval: 1200000,
    refetchOnWindowFocus: false,
  });

  const { ref: topIntersectionRef, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  return {
    data,
    status,
    error,
    topIntersectionRef,
    fetchNextPage,
    hasNextPage,
  };
}
