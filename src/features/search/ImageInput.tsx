import { IndexType, PhotoObj, PhotosObj } from "./types/searchTypes";
import { Dispatch, SetStateAction, useRef } from "react";

import { BiAddToQueue, BiQuestionMark, BiTrash } from "react-icons/bi";

interface Props {
  index: IndexType;
  setMyPhotos: Dispatch<SetStateAction<PhotosObj>>;
  myPhoto: PhotoObj;
}

/* interface Image {
  name: string;
  localUrl: string;
  url?: string;
  isDbImageRemoved?: boolean;
} */

function ImageInput({ index, setMyPhotos, myPhoto }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files;
    if (file?.length == 0 || !file) return;
    if (file !== null) {
      setMyPhotos((currentState) => {
        const newState = { ...currentState };
        newState[`image_${index}`].name = file[0].name;
        newState[`image_${index}`].localUrl = URL.createObjectURL(file[0]);
        newState[`image_${index}`].inputValue = file[0];
        return newState;
      });
    }
  }

  function deletePhoto() {
    setMyPhotos((currentState) => {
      const newState = { ...currentState };
      newState[`image_${index}`].name = "";
      newState[`image_${index}`].localUrl = "";
      newState[`image_${index}`].url = "";

      const isUrlPresent =
        currentState[`image_${index}`].url === newState[`image_${index}`].url;

      newState[`image_${index}`].isDbImageRemoved = isUrlPresent;
      return newState;
    });
  }

  return (
    <div className="  flex h-40 justify-center">
      <div className="relative aspect-[9/14] h-full  rounded-lg border-2 border-dashed border-neutral-500">
        {!myPhoto.url && !myPhoto.localUrl ? (
          <BiQuestionMark className="h-full w-full  text-neutral-400" />
        ) : (
          <>
            <div
              className="h-full rounded-lg bg-cover bg-center"
              style={{
                backgroundImage: `url(${myPhoto.url || myPhoto.localUrl})`,
              }}
            ></div>
          </>
        )}
        <div className="absolute bottom-0 right-0 h-11 w-11 translate-x-1/4 translate-y-1/4 rounded-full bg-amber-200">
          {myPhoto.url || myPhoto.localUrl ? (
            <BiTrash
              className="h-full  w-full rounded-full  p-2"
              onClick={deletePhoto}
            />
          ) : (
            <>
              <input
                id={`image_${index}`}
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                className="hidden"
                ref={fileInputRef}
                onChange={onFileChange}
              />
              <label htmlFor={`image_${index}`}>
                <BiAddToQueue className="h-full  w-full rounded-full  p-2" />
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageInput;
/* 
 <input
              id={`image_${index}`}
              {...register(`image_${index}`)}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden border border-red-800"
            />
*/
