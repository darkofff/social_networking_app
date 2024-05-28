import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

interface Props {
  isPostOpen: boolean;
}

function PostComment({ isPostOpen }: Props) {
  return (
    <>
      {!!isPostOpen && (
        <div className="mt-2 h-full w-full space-y-2">
          <div className="rounded-lg ">
            <FormRow comment={true}>
              <textarea
                id="postComment"
                placeholder="Tell us what you are thinking about..."
                defaultValue="Nie da się jeszcze dodać komentarzy"
              ></textarea>
              <label htmlFor="postComment">
                Currently it does absolutely nothing
              </label>
            </FormRow>
          </div>
          <div className="flex  justify-end ">
            <Button type="submit" style="empty">
              Submit
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default PostComment;
