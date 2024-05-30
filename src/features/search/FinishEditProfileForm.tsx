import { IndexType, PhotosObj } from "./searchTypes";
import { useState } from "react";

import { H2 } from "../../ui/Typography";
import ModalFormTemplate from "../../ui/ModalFormTemplate";
import ImageInput from "./ImageInput";
import FormRow from "../../ui/FormRow";
import { prepareDataToDispatch } from "./prepareDataToDispatch";
import { useUpdateSwipeData } from "./useUpdateSwiptData";

interface Props {
  profileData: any;
  is_profile_created: boolean;
}

const MAX_NUMBER_OF_PHOTOS = 6;

function FinishEditProfileForm({ profileData, is_profile_created }: Props) {
  const { useMutateSwipeData, isPending: isPendingDispatch } =
    useUpdateSwipeData();

  const [myPhotos, setMyPhotos] = useState<PhotosObj>({
    image_1: {
      url: profileData.image_1,
      isDbImageRemoved: false,

      localUrl: "",
      inputValue: "",
      name: "",
    },
    image_2: {
      url: profileData.image_2,
      isDbImageRemoved: false,

      localUrl: "",
      inputValue: "",
      name: "",
    },
    image_3: {
      url: profileData.image_3,
      isDbImageRemoved: false,

      localUrl: "",
      inputValue: "",
      name: "",
    },
    image_4: {
      url: profileData.image_4,
      isDbImageRemoved: false,

      localUrl: "",
      inputValue: "",
      name: "",
    },
    image_5: {
      url: profileData.image_5,
      isDbImageRemoved: false,

      localUrl: "",
      inputValue: "",
      name: "",
    },
    image_6: {
      url: profileData.image_6,
      isDbImageRemoved: false,

      localUrl: "",
      inputValue: "",
      name: "",
    },
  });

  const [bio, setBio] = useState<string>(profileData.bio_swipe || "");
  /* const [imagesError, setImagesError] = useState<boolean>(false);
  const [bioError, setBioError] = useState<boolean>(false); */

  const isAtLeastOnePhotoUploaded = Object.values(myPhotos).reduce(
    (acc, curr) => {
      return Boolean(acc + Number(Boolean(curr.localUrl || curr.url)));
    },
    0,
  );

  /* useEffect(() => {
    isAtLeastOnePhotoUploaded === true && setImagesError(false);
  }, [isAtLeastOnePhotoUploaded]);
  useEffect(() => {
    bio !== "" && setBioError(false);
  }, [bio]); */

  const title = is_profile_created ? "Edit profile" : "Create profile";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    /*   if (!isAtLeastOnePhotoUploaded || !bio) {
      if (!isAtLeastOnePhotoUploaded) setImagesError(true);
      if (!bio) setBioError(true);
      return;
    } */

    const { user_id } = profileData;
    const swipeProfileData = prepareDataToDispatch(
      myPhotos,
      { bio, bio_swipe: profileData.bio_swipe },
      user_id,
    );
    useMutateSwipeData(swipeProfileData);
  }

  return (
    <ModalFormTemplate
      title={title}
      buttonText={title}
      onSubmitControlled={onSubmit}
      buttonDisabled={isPendingDispatch}
    >
      <div className="py-3">
        {isAtLeastOnePhotoUploaded ? (
          <H2>Edit your photos</H2>
        ) : (
          <H2>Add at least one photo</H2>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: MAX_NUMBER_OF_PHOTOS }, (_, i) => (
          <ImageInput
            key={i}
            index={(i + 1) as IndexType}
            setMyPhotos={setMyPhotos}
            myPhoto={myPhotos[`image_${(i + 1) as IndexType}`]}
          />
        ))}
      </div>

      <div className="pb-3 pt-10">
        <H2>Bio</H2>
      </div>
      <div className="">
        <FormRow>
          <textarea
            name="bio_swipe"
            id="bio_swipe"
            placeholder="..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <label htmlFor="bio_swipe">Tell us about yourself</label>
          {/* {bioError && (
            <p className="pt-3 text-lg font-semibold text-red-600">
              *Can't leave you bio empty
            </p>
          )} */}
        </FormRow>
      </div>
    </ModalFormTemplate>
  );
}

export default FinishEditProfileForm;
