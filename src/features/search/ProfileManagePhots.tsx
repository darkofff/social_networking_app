import { useEffect, useState } from "react";
import PhotoActions from "./PhotoActions";
import { ImageNameObj, PhotoKeys } from "./searchTypes";

interface Props {
  index: number | null;
  photoObjToDisplay: ImageNameObj;
  arrayOfIndexes: number[];
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

function ProfileManagePhots({
  index,
  photoObjToDisplay,
  arrayOfIndexes,
  setIndex,
}: Props) {
  const [isNextPhoto, setIsNextPhoto] = useState<boolean>(false);
  const [isPrevPhoto, setIsPrevPhoto] = useState<boolean>(false);

  useEffect(() => {
    if (index !== null) {
      if (arrayOfIndexes[index + 1]) {
        setIsNextPhoto(true);
        console.log("there is next photo");
      } else {
        setIsNextPhoto(false);
        console.log("There is no next photo");
      }
      if (arrayOfIndexes[index - 1]) {
        setIsPrevPhoto(true);
        console.log("there is prev photo");
      } else {
        setIsPrevPhoto(false);
        console.log("There is no prev photo");
      }
    }
  }, [index, arrayOfIndexes]);

  function prevPhoto() {
    if (index === null) return;
    if (arrayOfIndexes[index - 1]) {
      setIndex((index) => (index as number) - 1);
    }
  }
  function nextPhoto() {
    if (index === null) return;
    if (arrayOfIndexes[index + 1]) {
      setIndex((index) => (index as number) + 1);
    }
  }

  return (
    <div
      style={{
        backgroundImage:
          index !== null
            ? `url(${photoObjToDisplay[`image_${arrayOfIndexes[index as number]}` as PhotoKeys]})`
            : "",
      }}
      className="relative max-h-[80%] min-h-[550px]  rounded-lg bg-cover bg-center"
    >
      <PhotoActions
        nextPhoto={nextPhoto}
        prevPhoto={prevPhoto}
        isNextPhoto={isNextPhoto}
        isPrevPhoto={isPrevPhoto}
      />
    </div>
  );
}

export default ProfileManagePhots;
