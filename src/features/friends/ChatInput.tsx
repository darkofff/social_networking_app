import Button from "../../ui/Button";
import { useState } from "react";

function ChatInput() {
  const [isInputInFocus, setIsInputInFocus] = useState<boolean>(false);
  /* window.onload = () => {
    const scrollableContent = document.getElementById('scrollable-content');
    scrollableContent.scrollTop = scrollableContent.scrollHeight; */
  return (
    <div className="flex items-center gap-2 border bg-neutral-200 p-1">
      <div className="flex grow items-center justify-center gap-x-2">
        <Button style="empty">Send</Button>
        <textarea
          placeholder="Write here..."
          name="new-message"
          id="new-message"
          className=" w-full rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-700"
          rows={isInputInFocus ? 3 : 1}
          onFocus={() => setIsInputInFocus(true)}
          onBlur={() => setIsInputInFocus(false)}
        ></textarea>
      </div>
    </div>
  );
}

export default ChatInput;
