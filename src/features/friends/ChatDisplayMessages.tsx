import { InfiniteData } from "@tanstack/react-query";
import MessageRow from "./MessageRow";
import { supabase } from "../../services/supabaseClient";
import { useEffect, useState } from "react";

interface Props {
  status: "error" | "pending" | "success";
  data:
    | InfiniteData<
        {
          messages: any[] | null;
          currentPage: number;
          nextPage: number;
        },
        unknown
      >
    | undefined;
  error: Error | null;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  currentUsername: string;
  conversation_id: number;
  profile_pic: string;
  bottomRef: React.MutableRefObject<HTMLDivElement | null>;
  inView: boolean;
}

interface NewMessage {
  content: string;
  conversation_id: number;
  created_at: string;
  message_id: number;
  sender_username: string;
}

function ChatDisplayMessages({
  status,
  data,
  error,
  contentRef,
  currentUsername,
  conversation_id,
  profile_pic,
  bottomRef,
  inView,
}: Props) {
  const [newMessages, setNewMessages] = useState<NewMessage[]>([]);

  const messages = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        const newObj = payload.new as NewMessage;
        if (conversation_id === newObj.conversation_id) {
          setNewMessages((state) => [...state, newObj]);
        }
      },
    )
    .subscribe();

  useEffect(() => {
    if (inView) bottomRef.current?.scrollIntoView();
  }, [newMessages]);

  return (
    <>
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <p>{error?.message}</p>
      ) : (
        <div className="flex flex-col-reverse " ref={contentRef}>
          <div className="flex flex-col ">
            {newMessages.map((message) => (
              <MessageRow
                content={message.content}
                key={message.message_id}
                isCurrentUserSender={
                  currentUsername === message.sender_username
                }
                profile_pic={profile_pic}
              />
            ))}
          </div>
          {data?.pages.map((page) => (
            <div key={page.currentPage} className="flex flex-col-reverse">
              {page.messages?.map((message) => (
                <MessageRow
                  content={message.content}
                  key={message.message_id}
                  isCurrentUserSender={
                    currentUsername === message.sender_username
                  }
                  profile_pic={profile_pic}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ChatDisplayMessages;
