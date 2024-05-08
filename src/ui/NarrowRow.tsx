import { ChildrenProp } from "../types/ChildrenProp";

// Narrow row for non modal forms, ladning page and so on

function NarrowRow({ children }: ChildrenProp) {
  return (
    <div className=" flex min-h-dvh w-full flex-col justify-center  sm:max-w-[400px]">
      {children}
    </div>
  );
}

export default NarrowRow;
