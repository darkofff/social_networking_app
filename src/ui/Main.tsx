import { ChildrenProp } from "../types/ChildrenProp";

function Main({ children }: ChildrenProp) {
  return <div className="sm:px-2 md:p-0">{children}</div>;
}

export default Main;
