import { ChildrenProp } from "../types/ChildrenProp";

function Main({ children }: ChildrenProp) {
  return <div className="p-[2px] sm:px-2 lg:px-0">{children}</div>;
}

export default Main;