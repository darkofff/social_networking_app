import { ChildrenProp } from "../../types/ChildrenProp";

interface Props extends ChildrenProp {
  title: string;
}

function SettingsRow({ children, title }: Props) {
  return (
    <div className="mb-4 space-y-2 border-b py-2">
      <h1 className=" text-2xl font-semibold  ">
        {title || "Title does not exist"}
      </h1>
      <div className="space-y-0">{children}</div>
    </div>
  );
}

export default SettingsRow;
