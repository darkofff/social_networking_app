import { ChildrenProp } from "../types/ChildrenProp";
import Button from "./Button";

/* 
    TEMPLATE FOR CREATIN MODAL FORMS
    
    - children
        # could be anything but I recommend using <FormRow>'s for consistency
    - title
        # main title like login or sign up
    - 

*/

interface Props extends ChildrenProp {
  title: string;
  onSubmit?: () => {};
  buttonText: string;
  buttonDisabled?: boolean;
}

function ModalFormTemplate({
  title,
  children,
  buttonText,
  onSubmit,
  buttonDisabled = false,
}: Props) {
  return (
    <div className="mx-auto  flex-col justify-center space-y-10  ">
      <header className=" flex justify-center ">
        <img src="/logos/logo-main.png" alt="logo" className="h-28 " />
      </header>
      <h1 className="text-4xl font-semibold tracking-wide sm:text-6xl">
        {title}
      </h1>
      <form onSubmit={onSubmit} className="">
        {children}
        <div className="mx-auto mt-10 w-[75%]">
          <Button type="submit" disabled={buttonDisabled}>
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
  /* return (
    <div className="mx-auto flex min-h-full flex-col justify-center space-y-10 border-2 border-red-500  ">
      <header className=" flex justify-center ">
        <img src="/logos/logo-main.png" alt="logo" className="h-28 " />
      </header>
      <h1 className="text-4xl font-semibold tracking-wide sm:text-6xl">
        {title}
      </h1>
      <form onSubmit={onSubmit} className="">
        {children}
        <div className="mx-auto mt-10 w-[75%]">
          <Button type="submit" disabled={false}>
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  ); */
}

export default ModalFormTemplate;
