import { useState } from "react";

import Button from "../../ui/Button";
import { useSendMessage } from "./hooks/useSendMessage";

interface Props {
  currentUsername: string;
  username: string;
  conversation_id: number;
}

function ChatInput({ currentUsername, username, conversation_id }: Props) {
  const [isInputInFocus, setIsInputInFocus] = useState<boolean>(false);
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
      className="flex items-center gap-2 border bg-neutral-200 p-1 py-3"
    >
      <div className="flex grow items-center justify-center gap-x-2">
        <Button callback={onSubmit} style="empty">
          Send
        </Button>
        <textarea
          placeholder="Write here..."
          name="new-message"
          id="new-message"
          className=" w-full resize-none rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
          rows={isInputInFocus ? 3 : 1}
          onFocus={() => setIsInputInFocus(true)}
          onBlur={() => setIsInputInFocus(false)}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></textarea>
      </div>
      <div></div>
    </div>
  );
}

export default ChatInput;
