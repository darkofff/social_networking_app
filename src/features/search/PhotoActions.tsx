import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

interface Props {
  nextPhoto: () => void;
  prevPhoto: () => void;
}

function PhotoActions({ nextPhoto, prevPhoto }: Props) {
  return (
    <div className="absolute bottom-1 flex w-full justify-between">
      <div
        className="ml-1 flex w-16 justify-center rounded-lg  border border-neutral-400 bg-neutral-400/70 p-1  text-white transition-all hover:bg-green-500/40"
        onClick={prevPhoto}
      >
        <BiLeftArrowAlt className="h-10 w-10" />
      </div>
      <div
        className="mr-1 flex  w-16 justify-center rounded-lg border border-neutral-400 bg-neutral-400/70 p-1  text-white transition-all hover:bg-green-500/40"
        onClick={nextPhoto}
      >
        <BiRightArrowAlt className="h-10 w-10" />
      </div>
    </div>
  );
}

export default PhotoActions;
