import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

interface Props {
  nextPhoto: () => void;
  prevPhoto: () => void;
}

function PhotoActions({ nextPhoto, prevPhoto }: Props) {
  return (
    <div className="absolute bottom-1 flex w-full justify-between">
      <div
        className="ml-1 rounded-lg border-black bg-neutral-200/30 p-1 text-white"
        onClick={prevPhoto}
      >
        <BiLeftArrowAlt className="h-10 w-10" />
      </div>
      <div
        className="mr-1 rounded-lg border-black bg-neutral-200/30 p-1 text-white"
        onClick={nextPhoto}
      >
        <BiRightArrowAlt className="h-10 w-10" />
      </div>
    </div>
  );
}

export default PhotoActions;
