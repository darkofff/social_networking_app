import { useForm } from "react-hook-form";
import { RawFormData } from "../news/NewsTypes";

import { useProfileData } from "../../contexts/ProfileDataContext";

import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useAddPost } from "./hooks/useAddPost";

function AddPost() {
  const { register, handleSubmit } = useForm<RawFormData>();
  const { addPost } = useAddPost();
  const { profileData } = useProfileData();

  function onSubmit(formData: RawFormData) {
    addPost({
      content: formData.post,
      username: profileData.username,
    });
  }

  return (
    <div className="border-b-2 pb-2 dark:border-neutral-400">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <FormRow>
          <select className="border">
            <option value="select">Select region:</option>
            <option value="General">General</option>
            <option disabled={true} value="null">
              More regions to come
            </option>
          </select>
        </FormRow> */}
        <FormRow>
          <textarea
            {...register("post", {
              maxLength: 500,
            })}
            id="post"
            placeholder="Tell us what you are thinking about..."
          ></textarea>
          <label htmlFor="post">Write here</label>
        </FormRow>
        <div className="flex justify-center md:justify-end ">
          <div className="w-[80%] sm:w-[60%] md:w-[40%]">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
