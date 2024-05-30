import { useEffect, useRef } from "react";
import { supabase } from "../../services/supabaseClient";
import { useGetInfiniteMessages } from "./hooks/useGetInfiniteMessages";
import MessageRow from "./MessageRow";

interface Props {
  currentUsername: string;
  username: string;
  conversation_id: number;
}

function ChatContent({ currentUsername, username, conversation_id }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    // dodać intersectionRef i jeśli on jest in view to nie przemieszczać
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, []);

  const {
    data,
    status,
    error,
    topIntersectionRef,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteMessages(conversation_id);

  const messages = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages" },
      (payload) => {
        console.log("Change received!", payload);
      },
    )
    .subscribe();

  return (
    <div
      className=" flex grow flex-col justify-end overflow-auto border border-red-500"
      ref={ref}
    >
      <div ref={topIntersectionRef}>TOP intersection ref</div>
      <div className=" h-fit border-2 border-dashed border-blue-900">
        <div className=" border">
          {status === "pending" ? (
            <p>Loading...</p>
          ) : status === "error" ? (
            <p>{error?.message}</p>
          ) : (
            data?.pages.map((page) => (
              <div className="flex  flex-col-reverse" key={page.currentPage}>
                {page.messages?.map((message) => (
                  <MessageRow
                    content={message.content}
                    key={message.message_id}
                    isCurrentUserSender={
                      currentUsername === message.sender_username
                    }
                  />
                ))}
              </div>
            ))
          )}
        </div>
        <div>Observer</div>
      </div>
    </div>
  );
}

export default ChatContent;

/* 

{
    "pages": [
        {
            "messages": [
                {
                    "message_id": 11,
                    "created_at": "2024-05-30T07:51:31.123922+00:00",
                    "conversation_id": 1,
                    "sender_username": "oryginal_gangsta_1",
                    "content": "Hey Jude!"
                },
                {
                    "message_id": 10,
                    "created_at": "2024-05-30T07:51:17.464747+00:00",
                    "conversation_id": 1,
                    "sender_username": "oryginal_gangsta_1",
                    "content": "kappa"
                },
                {
                    "message_id": 9,
                    "created_at": "2024-05-30T07:49:50.76729+00:00",
                    "conversation_id": 1,
                    "sender_username": "oryginal_gangsta_1",
                    "content": "create"
                },
                {
                    "message_id": 8,
                    "created_at": "2024-05-30T07:43:06.880888+00:00",
                    "conversation_id": 1,
                    "sender_username": "oryginal_gangsta_1",
                    "content": "dsaqdasdsa"
                },
                {
                    "message_id": 3,
                    "created_at": "2024-05-29T17:24:38.780062+00:00",
                    "conversation_id": 1,
                    "sender_username": "notehi9022",
                    "content": "What's uppp"
                }
            ],
            "currentPage": 1,
            "nextPage": 2
        }
    ],
    "pageParams": [
        1
    ]
}
*/
