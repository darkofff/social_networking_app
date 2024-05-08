import UpdateProfileModal from "./UpdateProfileModal";
import useProfileData from "./useProfileData";
import { useState } from "react";
import { UpdateProfileData } from "../../types/UpdateProfileData";

function ProfileInfo() {
  const [nameEdit, isNameEdit] = useState<boolean>(false);
  const [lastNameEdit, isLastNameEdit] = useState<boolean>(false);

  const { data, error, isPending } = useProfileData();
  const { bgc_pic, profile_pic, username, name, last_name, bio } = data;
  const dataToUpdate = {bgc_pic, profile_pic, username, name, last_name, bio}

  return (
    <div className="border-b-2 pb-2">
      <div
        className="aspect-[21/9] bg-cyan-50 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgc_pic ? bgc_pic : "anonymous/bgc_pic_anon.png"} )`,
        }}
      ></div>
      <div className="px-2 lg:px-4">
        <div className="relative mb-1  min-h-14  sm:h-16 md:h-20 lg:h-24">
          <div
            className=" absolute aspect-square w-28 -translate-y-1/2 rounded-full border-4 border-neutral-50 bg-lime-800 bg-contain bg-center sm:w-32 md:w-40 lg:w-48"
            style={{
              backgroundImage: `url(${profile_pic ? profile_pic : "anonymous/profile_pic_anon.png"} )`,
            }}
          ></div>
          <div className="flex w-full justify-end">
            <div className="w-40 sm:w-48 md:w-52">
              <UpdateProfileModal
                dataToUpdate={{ bgc_pic, profile_pic, name, last_name, bio }}
              />
            </div>
          </div>
        </div>
        <div className="min-h-10 space-y-2 pl-2">
          <div className="">
            <div className="text-2xl font-semibold tracking-wide">
              {name} {last_name}
            </div>
            <div className="text-md ">@{username}</div>
          </div>
          <div className="text-xl font-medium">{bio}</div>
          <div>Jakieś info. Liczba postów, znajomych czy coś takiego</div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="border-b-2">
  //     <div
  //       className="aspect-[21/9] bg-slate-700 bg-cover bg-center"
  //       style={{ backgroundImage: `url(${bgc_pic})` }}
  //     ></div>
  //     <div className="  border-2 border-dotted border-emerald-950 px-2">
  //       {/* Left */}
  //       <div className="   sm:w-1/3 md:w-3/12">
  //         <div className=" relative z-10 aspect-square h-32  w-full rounded-full bg-neutral-50  dark:bg-neutral-900   sm:h-auto ">
  //           <div
  //             className="absolute left-4 top-0 aspect-square h-32 w-32 -translate-y-1/2   rounded-full  border-2  bg-neutral-50 bg-contain bg-no-repeat  sm:left-1/2  sm:h-40  sm:w-40	 sm:-translate-x-1/2 md:h-[98%] md:w-[98%] lg:h-[98%] lg:w-[98%]"
  //             style={{
  //               backgroundImage: `url(${profile_pic ? profile_pic : "anonymous/profile_pic_anon.png"} )`,
  //             }}
  //           ></div>
  //           <div className=" ">
  //             <div className="h-10 bg-amber-200 sm:h-20 md:h-28">dsa</div>
  //             <div className="mb-1  bg-slate-300 sm:text-center">
  //               <div className="flex gap-1 border border-red-900 sm:justify-center">
  //                 <p className="inline-block border  border-green-600 font-semibold">
  //                   {name} {last_name}
  //                 </p>
  //                 <span className="flex items-center justify-center border border-violet-700 ">
  //                   {<HiPencil className="h-5 w-7" />}
  //                 </span>
  //               </div>
  //               <p>@{username} </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Rigth */}
  //       <div className=" border-2 border-red-800 sm:w-2/3 md:w-9/12">
  //         <div className="flex justify-end border">
  //           <div className="w-[40%]">
  //             <UpdateProfileModal bgc_pic={bgc_pic} profile_pic={profile_pic} />
  //           </div>
  //         </div>
  //         <div>Bio</div>
  //         <div>Lorem ipsu</div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default ProfileInfo;
