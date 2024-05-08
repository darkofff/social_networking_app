import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

function AddPost() {
  return (
    <div className="border-b-2 pb-2">
      <form>
        <FormRow>
          <select className="border">
            <option value="select">Select region:</option>
            <option value="General">General</option>
            <option disabled={true} value="null">
              More regions to come
            </option>
          </select>
        </FormRow>
        <FormRow>
          <textarea
            name="post"
            id="post"
            placeholder="Tell us what you are thinking about..."
          ></textarea>
          <label htmlFor="post">O czym chcesz nam dziś powiedzieć?</label>
        </FormRow>
        <div className="flex justify-center md:justify-end ">
          <div className="w-[80%] sm:w-[60%] md:w-[40%]">
            <Button type="submit">Opublikuj</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
