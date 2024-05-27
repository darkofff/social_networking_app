import { BiEdit } from "react-icons/bi";
import { PhotoObj } from "./profileTypes";
import { Dispatch, SetStateAction } from "react";

interface Props {
  bgc_pic: PhotoObj;
  profile_pic: PhotoObj;
  set_bgc_pic: Dispatch<SetStateAction<PhotoObj>>;
  set_profile_pic: Dispatch<SetStateAction<PhotoObj>>;
}

function EditProfileFormPhotos({
  bgc_pic,
  set_bgc_pic,
  profile_pic,
  set_profile_pic,
}: Props) {
  function onBgcPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files;
    if (file?.length == 0 || !file) return;
    if (file !== null) {
      set_bgc_pic((currentState) => {
        const newState = { ...currentState };

        newState.isPhotoEddited = true;
        newState.name = file[0].name;
        newState.localUrl = URL.createObjectURL(file[0]);
        newState.inputValue = file[0];
        console.log(newState);

        return newState;
      });
    }
  }
  function onProfilePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files;
    if (file?.length == 0 || !file) return;
    if (file !== null) {
      set_profile_pic((currentState) => {
        const newState = { ...currentState };

        newState.isPhotoEddited = true;
        newState.name = file[0].name;
        newState.localUrl = URL.createObjectURL(file[0]);
        newState.inputValue = file[0];

        return newState;
      });
    }
  }

  return (
    <div>
      <div
        className="relative  aspect-[21/9] w-full rounded-lg bg-neutral-300 bg-cover bg-center  hover:ring-2 hover:ring-green-500/75"
        style={{
          backgroundImage: `url(${bgc_pic.localUrl || bgc_pic.url || ""})`,
        }}
      >
        <div className=" flex h-full w-full">
          <input
            type="file"
            id="bgc_pic"
            name="bgc_pic"
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            onChange={onBgcPhotoChange}
          />
          <label
            htmlFor="bgc_pic"
            className="flex h-full w-full items-center justify-center  transition-all"
            tabIndex={0}
          >
            <div className="rounded-md bg-neutral-50/90 p-1">
              <BiEdit className="h-10 w-10  text-neutral-700" />
            </div>
          </label>
        </div>
      </div>
      <div
        className=" ml-2 aspect-square w-1/4 min-w-20 -translate-y-1/2  rounded-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${profile_pic.localUrl || profile_pic.url || "anonymous/profile_pic_anon.png"})`,
        }}
      >
        <div className=" h-full w-full rounded-full ">
          <input
            type="file"
            name="profile_pic"
            id="profile_pic"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onProfilePhotoChange}
          />
          <label
            htmlFor="profile_pic"
            className=" flex h-full w-full items-center justify-center rounded-full transition-all hover:ring-2 hover:ring-green-500/75 focus:ring-green-500/75"
            tabIndex={0}
          >
            <div className="rounded-md bg-neutral-50/90 p-1">
              <BiEdit className="h-10 w-10 text-neutral-800" />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default EditProfileFormPhotos;
