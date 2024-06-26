import { ChildrenProp } from "../types/ChildrenProp";

interface Props extends ChildrenProp {
  classes?: string;
}

function Row({ children, classes = "" }: Props) {
  return (
    <div
      className={` relative w-full max-w-5xl  overflow-hidden rounded-lg  md:mx-auto md:rounded-none ${classes}`}
    >
      {children}
    </div>
  );
}

export default Row;
