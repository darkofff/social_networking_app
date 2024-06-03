import { useEffect, useRef, useState } from "react";
import { useGetInfiniteMessages } from "./hooks/useGetInfiniteMessages";
import ChatDisplayMessages from "./ChatDisplayMessages";

interface FunctionInterface {
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  pages: number;
  isContentHeightGreaterThanChat: boolean;
}
function getHeightOfLastPage({
  contentRef,
  pages,
  isContentHeightGreaterThanChat,
}: FunctionInterface) {
  // Gets the height of the last page comming from infinite scroll
  // but only if inital page is loaded (isContentHeightGreaterThanChat===true)
  if (!contentRef.current) return;
  if (pages && pages > 0) {
    const lastPage = contentRef.current.children[pages - 1];
    if (lastPage instanceof HTMLElement && isContentHeightGreaterThanChat) {
      return lastPage.offsetHeight;
    }
  }
}

interface Props {
  currentUsername: string;
  username: string;
  conversation_id: number;
  profile_pic: string;
}

function ChatContent({
  currentUsername,
  username,
  conversation_id,
  profile_pic,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null); // This component
  const contentRef = useRef<HTMLDivElement | null>(null); // div that contains messages
  const bottomRef = useRef<HTMLDivElement | null>(null); // div at the bottom of messages container

  // For loading first page. If messages take up less height than container then value is false
  const [isContentHeightGreaterThanChat, setIsContentHeightGreaterThanChat] =
    useState<boolean>(false);

  const {
    data,
    status,
    error,
    hasNextPage,
    topIntersectionRef,
    fetchNextPage,
  } = useGetInfiniteMessages(conversation_id);

  useEffect(() => {
    if (contentRef.current && ref.current) {
      if (contentRef.current.scrollHeight < ref.current.offsetHeight) {
        // If messages don't take up whole page, load some more
        fetchNextPage();
      } else {
        if (!isContentHeightGreaterThanChat) {
          // If messages take up whole page set that to variable
          setIsContentHeightGreaterThanChat(true);
        } else {
          // If messages already take up whole page and some more data is loaded
          // get the height new data takes on display
          const height = getHeightOfLastPage({
            contentRef,
            pages: data?.pages.length || 0,
            isContentHeightGreaterThanChat,
          });
          // and scroll container by this amount
          if (height) ref.current.scrollTop = height;
        }
      }
    }
  }, [contentRef.current, ref.current, data]);

  useEffect(() => {
    // Scrolls container to the bottom when page is loading
    if (contentRef.current && ref.current) {
      if (!isContentHeightGreaterThanChat) {
        bottomRef.current?.scrollIntoView();
      }
    }
  }, [
    contentRef.current?.scrollHeight,
    bottomRef.current,
    isContentHeightGreaterThanChat,
  ]);

  return (
    <div ref={ref} className=" flex grow flex-col  overflow-y-auto  ">
      <div className="z-50 w-full text-2xl" ref={topIntersectionRef}>
        {hasNextPage ? "" : <p>There are no more messages</p>}
      </div>
      <div className="grow"></div>
      <ChatDisplayMessages
        status={status}
        contentRef={contentRef}
        data={data}
        currentUsername={currentUsername}
        error={error}
        conversation_id={conversation_id}
        profile_pic={profile_pic}
      />
      <div className="h-1" ref={bottomRef}></div>
    </div>
  );
}

export default ChatContent;

/*  const messages = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages" },
      (payload) => {
        console.log("Change received!", payload);
      },
    )
    .subscribe(); */
