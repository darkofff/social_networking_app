import { useState } from "react";
import { useForm } from "react-hook-form";
import { UpdateProfileData } from "../../types/UpdateProfileData";
import { useUpdateProfile } from "./useUpdateProfile";
import { DataToUpdate, EditProfileObj, PhotoObj } from "./profileTypes";
import { prepareDataToDispatch } from "./prepareProfileDataToDispatch";

import FormRow from "../../ui/FormRow";
import ModalFormTemplate from "../../ui/ModalFormTemplate";
import EditProfileFormPhotos from "./EditProfileFormPhotos";

function EditProfileForm({ dataToUpdate }: DataToUpdate) {
  const { register, handleSubmit } = useForm<UpdateProfileData>({
    defaultValues: dataToUpdate,
  });

  const [bgc_pic, set_bgc_pic] = useState<PhotoObj>({
    url: dataToUpdate.bgc_pic,
    localUrl: null,
    inputValue: null,
    isPhotoEddited: false,
    name: "",
  });
  const [profile_pic, set_profile_pic] = useState<PhotoObj>({
    url: dataToUpdate.profile_pic,
    localUrl: null,
    inputValue: null,
    isPhotoEddited: false,
    name: "",
  });

  const { updateProfile, isPending } = useUpdateProfile();

  function onSubmit(formData: UpdateProfileData) {
    const editProfileObj: EditProfileObj = prepareDataToDispatch({
      dataToUpdate,
      formData,
      bgc_pic,
      profile_pic,
    });

    if (Object.keys(editProfileObj).length === 0) {
      alert("Edit at least one thing to update");
      return;
    }
    updateProfile(editProfileObj);
  }

  return (
    <ModalFormTemplate
      title="Edit Profile"
      buttonText="Edit Profile"
      onSubmit={handleSubmit(onSubmit)}
      buttonDisabled={isPending}
    >
      <EditProfileFormPhotos
        bgc_pic={bgc_pic}
        profile_pic={profile_pic}
        set_bgc_pic={set_bgc_pic}
        set_profile_pic={set_profile_pic}
      />
      <div className="-mt-8 md:-mt-12">
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
          <label htmlFor="last_name">Last Name</label>
        </FormRow>
        <FormRow>
          <textarea
            id="bio"
            placeholder="Tell us about yourself..."
            {...register("bio")}
          />
          <label htmlFor="bio">Bio</label>
        </FormRow>
      </div>
    </ModalFormTemplate>
  );
}

export default EditProfileForm;
