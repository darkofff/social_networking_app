import { useState } from "react";
import { useSendComment } from "./hooks/useSendComment";
import { validateString } from "../../utilities/validateString";
import { toast } from "react-toastify";

import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

interface Props {
  post_id: number;
  currentUsername: string;
  authorUsername: string;
  last_name: string;
  name: string;
}

const MAX_COMMENT_LENGTH = 350;

function PostComment({
  authorUsername,
  currentUsername,
  post_id,
  last_name,
  name,
}: Props) {
  const [content, setContent] = useState<string>("");

  const { sendComment, isPending } = useSendComment();

  function handleSubmit() {
    const { isValid } = validateString(content, MAX_COMMENT_LENGTH);
    if (!isValid) {
      toast.warn("Can't post empty comment.", { autoClose: 1000 });
      return;
    }
    sendComment(
      { post_id, content, username: currentUsername },
      {
        onSuccess: () => {
          setContent("");
        },
      },
    );
  }

  return (
    <div className="mt-2 h-full w-full space-y-2">
      <div className="rounded-lg ">
        <FormRow comment={true}>
          <textarea
            value={content}
            maxLength={350}
            id="postComment"
            placeholder="Tell us what you are thinking about..."
            onChange={(e) => setContent(e.target.value)}
            disabled={content.length > MAX_COMMENT_LENGTH}
          ></textarea>
          <label htmlFor="postComment">{`Reply to ${name} ${last_name}`}</label>
        </FormRow>
      </div>
      <div className="flex  justify-between ">
        <p>
          {content.length}/{MAX_COMMENT_LENGTH} characters
        </p>
        <Button type="submit" style="empty" callback={handleSubmit}>
          Submit
        </Button>
      </div>

      <div className=" resize border">COMMENT</div>
      <div>COMMENT</div>
      <div>COMMENT</div>
      <div>COMMENT</div>
    </div>
  );
}

export default PostComment;
