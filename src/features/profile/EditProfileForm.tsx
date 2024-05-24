import { useForm } from "react-hook-form";
import { useUpdateProfile } from "./useUpdateProfile";
import { UpdateProfileData } from "../../types/UpdateProfileData";

import FormRow from "../../ui/FormRow";
import ModalFormTemplate from "../../ui/ModalFormTemplate";
import { DataToUpdate } from "./profileTypes";

function EditProfileForm({ dataToUpdate }: DataToUpdate) {
  const { register, handleSubmit } = useForm<UpdateProfileData>({
    defaultValues: dataToUpdate,
  });

  const { updateProfile, isPending } = useUpdateProfile();

  function onSubmit(formData: UpdateProfileData) {
    console.log(formData);

    let newObj = {} as UpdateProfileData;

    if (formData.name !== dataToUpdate.name) {
      newObj.name = formData.name;
    }
    if (formData.last_name !== dataToUpdate.last_name) {
      newObj.last_name = formData.last_name;
    }
    if (formData.bio !== dataToUpdate.bio) {
      newObj.bio = formData.bio;
    }
    if (formData.profile_pic !== dataToUpdate.profile_pic) {
      newObj.profile_pic = formData.profile_pic;
    }
    if (formData.bgc_pic !== dataToUpdate.bgc_pic) {
      newObj.bgc_pic = formData.bgc_pic;
    }

    if (Object.keys(newObj).length === 0) {
      alert("Edit at least one thing to update");
      return;
    }

    updateProfile(newObj);
  }

  return (
    <ModalFormTemplate
      title="Edit Profile"
      buttonText="Edit Profile"
      onSubmit={handleSubmit(onSubmit)}
      buttonDisabled={isPending}
    >
      <FormRow>
        <input
          type="text"
          id="name"
          placeholder="Enter your name..."
          {...register("name")}
        />
        <label htmlFor="name">Name</label>
      </FormRow>
      <FormRow>
        <input
          type="text"
          id="last_name"
          placeholder="Enter your last name..."
          {...register("last_name")}
        />
        <label htmlFor="last-name">Last Name</label>
      </FormRow>
      <FormRow>
        <input
          type="text"
          id="name"
          placeholder="Tell us about yourself..."
          {...register("bio")}
        />
        <label htmlFor="name">Bio</label>
      </FormRow>
      <FormRow>
        <input type="text" id="profile_pic" {...register("profile_pic")} />
        <label htmlFor="profile_pic">Profile picture</label>
      </FormRow>
      <FormRow>
        <input type="text" id="bgc_pic" {...register("bgc_pic")} />
        <label htmlFor="bgc_pic">Bg picture</label>
      </FormRow>
    </ModalFormTemplate>
  );
}

export default EditProfileForm;
