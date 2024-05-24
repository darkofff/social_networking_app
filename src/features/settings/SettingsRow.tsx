import { ChildrenProp } from "../../types/ChildrenProp";

interface Props extends ChildrenProp {
  title: string;
}

function SettingsRow({ children, title }: Props) {
  return (
    <div className="space-y-1 border-b">
      <h1 className=" text-2xl font-semibold ">
        {title || "Title does not exist"}
      </h1>
      <div>{children}</div>
    </div>
  );
}

export default SettingsRow;
