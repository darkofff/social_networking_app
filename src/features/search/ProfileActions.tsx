import { HiAcademicCap } from "react-icons/hi";
import { SlLike } from "react-icons/sl";
import { HiMiniExclamationTriangle } from "react-icons/hi2";
function ProfileActions() {
  return (
    <div className="flex h-14 justify-between bg-purple-500 py-1">
      <span>
        <HiAcademicCap className="h-12 w-12 " />
      </span>
      <span>
        <HiMiniExclamationTriangle className="h-12 w-12 " />
      </span>
      <span>
        <SlLike className="h-12 w-12 " />
      </span>
    </div>
  );
}

export default ProfileActions;
