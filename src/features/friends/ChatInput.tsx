import { Dispatch, SetStateAction, useState } from "react";

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

  async function onSubmit() {
    sendMessage(
      { currentUsername, content: inputValue, conversation_id },
      {
        onSuccess: () => setInputValue(""),
      },
    );
  }

  return (
    <div
      id="content"
      className="flex items-center gap-2 rounded-b-lg border bg-neutral-200 p-1 py-3 dark:border-neutral-600 dark:bg-neutral-800"
    >
      <div className="flex grow items-center justify-center gap-x-2">
        <Button
          callback={onSubmit}
          style="empty"
          onFocus={() => setIsInputExpanded(true)}
          onBlur={() => setIsInputExpanded(false)}
        >
          Send
        </Button>
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        ></textarea>
      </div>
      <div></div>
    </div>
  );
}

export default ChatInput;
