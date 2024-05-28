import { ChildrenProp } from "../types/ChildrenProp";

interface Props extends ChildrenProp {
  className?: string;
}

function Select({ children, className }: Props) {
  return (
    <div
      className={`
      flex
        flex-wrap
        items-center
        gap-x-1
        [&>select]:rounded-sm
        [&>select]:border
        [&>select]:border-neutral-200
        [&>select]:p-1
        focus:[&>select]:border-0
        focus:[&>select]:outline-none
        focus:[&>select]:ring-1
        focus:[&>select]:ring-green-500
        [&>select]:dark:border-neutral-700
        [&>select]:dark:bg-neutral-500 ${className}`}
    >
      {children}
    </div>
  );
}

export default Select;
/* 
rounded-sm border border-neutral-200 p-1 dark:border-neutral-500 dark:bg-neutral-600
*/
