import { ChildrenProp } from "../types/ChildrenProp";

/* 
!!! Important
Inside <FormRow> order of items have to be preserved. Input first then label

*/

interface Props extends ChildrenProp {
  type?: string;
}

function FormRow({ children, type }: Props) {
  if (type === "file")
    return (
      <div
        className="
        
        form-row
        flex
        flex-col-reverse
        
        rounded-md
        border
        border-neutral-200
        
        [&>input]:p-1
        [&>input]:px-3
        [&>input]:pt-3
        [&>input]:outline-none
        [&>label]:px-3 
        [&>label]:py-1
        [&>label]:font-semibold
        [&>label]:text-neutral-400
  "
      >
        {children}
      </div>
    );

  return (
    <div
      /* form-row is in index.css. It had to be separate class because tailwind's peer doesn't work with [&>input]: */
      className={`
        form-row
        relative
        mb-3
        flex
        flex-col
        [&>input]:rounded-md
        [&>input]:bg-neutral-50
        [&>input]:p-1
        [&>input]:px-3
        [&>input]:pt-7 
        [&>input]:text-lg
        [&>input]:font-normal
        [&>input]:text-neutral-700
        [&>input]:outline-none  
        [&>input]:focus-within:outline
        [&>input]:focus-within:ring-2 
         
        
        [&>input]:focus-within:ring-amber-500
        [&>label]:absolute [&>label]:top-0        
        
        [&>label]:w-[96%] 
        [&>label]:rounded-t-md 
        [&>label]:bg-neutral-50 
        [&>label]:px-3 
        [&>label]:py-1
        [&>label]:font-semibold
        [&>label]:text-neutral-400
        dark:[&>label]:bg-neutral-700
        
        [&>select]:rounded-full
        [&>select]:px-3
        [&>select]:py-3
        [&>select]:text-lg
        [&>select]:font-normal
        [&>select]:outline-none
        [&>select]:focus-within:outline
        [&>select]:focus-within:ring-2 
        [&>select]:focus-within:ring-amber-500

        [&>textarea]:min-h-36
        [&>textarea]:resize-y
        [&>textarea]:rounded-md
        [&>textarea]:bg-neutral-50
        [&>textarea]:px-3
        [&>textarea]:pt-7 
        [&>textarea]:text-lg
        [&>textarea]:font-normal
        [&>textarea]:outline-none
        [&>textarea]:focus-within:outline
        [&>textarea]:focus-within:ring-2
        [&>textarea]:focus-within:ring-amber-500
        dark:[&>textarea]:bg-neutral-700
        

      
        `}
    >
      {children}
    </div>
  );
}

export default FormRow;