import { useEffect, useState } from "react";
import { useGetSwipeProfile } from "./useGetSwipeProfile";
import { ImageNameObj, PhotoKeys } from "./types/searchTypes";

import UserActions from "./UserActions";
import ProfileManagePhots from "./ProfileManagePhots";

function DisplayProfiles() {
  /* 
    onClick na przycisku "następny profil" uruchomi funckję useGetUsernames, 
    która uzyskuje kolejne username i index a następnie umieszcza je w url

    Zmianę parametrów url wykrywa useGetSwipeProfile 
    i na tej podstawie pobiera informacje o użytkowniku 
  */

  const { swipeData, error, isPending } = useGetSwipeProfile();

  const [index, setIndex] = useState<number | null>(null);
  const [photoObjToDisplay, setPhotoObjToDisplay] = useState<ImageNameObj>({});
  const [arrayOfIndexes, setArrayOfIndexes] = useState<number[]>([]);

  useEffect(() => {
    if (!isPending) {
      for (let i = 1; i <= 6; i++) {
        if (swipeData?.[`image_${i}`]) {
          setArrayOfIndexes((state) => {
            return [...state, i];
          });
          setIndex((state) => (state === null ? i - 1 : state));
          setPhotoObjToDisplay((obj) => {
            obj[`image_${i}` as PhotoKeys] = swipeData[`image_${i}`];
            return obj;
          });
        }
      }
    }
    return () => {
      setArrayOfIndexes([]);
      setIndex(null);
    };
  }, [isPending]);

  if (isPending) return <p>Loading...</p>;

  const { bio_swipe, name } = swipeData;

  return (
    <div className="mx-auto  flex h-dvh max-w-[540px] flex-col justify-center">
      <div className="relative z-10 mx-auto overflow-y-auto rounded-lg    ">
        <div className="space-y-2 p-2">
          <ProfileManagePhots
            index={index}
            photoObjToDisplay={photoObjToDisplay}
            arrayOfIndexes={arrayOfIndexes}
            setIndex={setIndex}
          />

          <div className="h-0 overflow-hidden">
            STRETCHER-It's only function is to stretch div to it's max
            width-------------------------------------------------------------------------------------------------------------------------------------
          </div>

          <div className="text-3xl font-semibold">{name}</div>
          <pre className="text-wrap font-LibreFranklin text-base font-normal ">
            {bio_swipe}
          </pre>
        </div>
        <div className="sticky bottom-0 ">
          <UserActions username={swipeData.username} />
        </div>
      </div>
    </div>
  );
}

export default DisplayProfiles;
