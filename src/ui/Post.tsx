import { HiAnnotation, HiLink, HiUpload } from "react-icons/hi";
import { HiBugAnt } from "react-icons/hi2";

interface Post {
  post: string;
}

function Post({ post }: Post) {
  return (
    <div className=" mb-6 flex flex-col">
      <div className="flex space-x-2">
        <div className="h-10 w-10 rounded-full bg-red-600"></div>
        <div>Name</div>
      </div>
      <div>{post}</div>
      <div className="flex  space-x-2">
        <HiLink className="h-8 w-8 " />
        <HiUpload className="h-8 w-8 " />
        <HiAnnotation className="h-8 w-8 " />
      </div>
      <div className="mt-2 h-[1px] w-[80%] self-center bg-neutral-500"></div>
    </div>
  );
}

export default Post;
