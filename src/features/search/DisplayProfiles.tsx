import { useState } from "react";
import { useGetSuggestions } from "./useGetSuggestions";

import ProfileActions from "./ProfileActions";

function DisplayProfiles() {
  const { profiles, isPending } = useGetSuggestions();
  const [index, setIndex] = useState<number>(1);

  console.log(profiles);

  if (isPending) return null;
  const { name, profile_pic, bio } = profiles?.at(index);

  return (
    <div className="relative h-dvh border-2 border-dotted border-red-800 ">
      <div className="sticky top-[64px]  h-[calc(100%-64px)] w-full bg-slate-400"></div>
    </div>
  );
}

export default DisplayProfiles;
/* 
<div className=" flex  h-[calc(100%-64px)] items-center   "></div>
*/
