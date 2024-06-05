import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Button from "../../ui/Button";
import { useSendMessage } from "./hooks/useSendMessage";

interface Props {
  currentUsername: string;
  username: string;
  conversation_id: number;
  setIsInputExpanded: Dispatch<SetStateAction<boolean>>;
  isInputExpanded: boolean;
}

function ChatInput({
  currentUsername,
  conversation_id,
  isInputExpanded,
  setIsInputExpanded,
}: Props) {
  const [inputValue, setInputValue] = useState<string>("");

  const { sendMessage } = useSendMessage();

  function onSubmit() {
    if (!inputValue) return;
    sendMessage(
      { currentUsername, content: inputValue, conversation_id },
      {
        onSuccess: () => setInputValue(""),
      },
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log(e);

    if (e.key === "Enter" && !e.shiftKey) {
      onSubmit();
    }
  };

  return (
    <div
      id="content"
      className="flex items-center gap-2 rounded-b-lg border bg-neutral-200 p-1 py-3 dark:border-neutral-600 dark:bg-neutral-800"
    >
      <div className="flex grow items-center justify-center gap-x-2">
        <textarea
          placeholder="Write here..."
          name="new-message"
          id="new-message"
          className=" w-full resize-none rounded-lg px-2 py-2  focus:outline-none focus:ring-2 focus:ring-green-700 dark:bg-neutral-600 dark:text-neutral-100"
          rows={isInputExpanded ? 3 : 1}
          onFocus={() => setIsInputExpanded(true)}
          onBlur={() => {
            setTimeout(() => {
              setIsInputExpanded(false);
            }, 500);
          }}
          onKeyDown={handleKeyDown}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        ></textarea>
        <Button type="submit" style="empty" callback={onSubmit}>
          Send
        </Button>
      </div>
      <div></div>
    </div>
  );
}

export default ChatInput;
