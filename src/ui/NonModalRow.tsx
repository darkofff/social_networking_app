import { HiCog6Tooth } from "react-icons/hi2";
import Row from "./Row";
import NarrowRow from "./NarrowRow";
import { ChildrenProp } from "../types/ChildrenProp";

/* 
    Whole page that displays narrow content in the center. 
    Used to create landing and register page
*/

interface Props extends ChildrenProp {
  callback?: () => void;
}

function NonModalRow({
  children,
  callback = () => {
    console.log("click");
  },
}: Props) {
  return (
    <div className="absolute top-0 flex min-h-dvh w-full justify-center bg-gradient-to-bl from-amber-100 to-emerald-950  ">
      <Row classes="flex justify-center  ">
        <HiCog6Tooth
          onClick={callback}
          className="absolute  right-2 top-2 h-14 w-14 hover:text-slate-800 sm:top-10"
        />
        <NarrowRow>
          <div className=" relative flex flex-col rounded-md px-4 md:bg-amber-50/10 md:px-8 md:py-20 md:backdrop-blur-xl">
            <header className="mb-10 flex justify-center">
              <img src="/logos/logo-main.png" alt="logo" className="h-44 " />
            </header>

            <main className="flex  flex-col justify-evenly  ">{children}</main>
          </div>
        </NarrowRow>
      </Row>
    </div>
  );
}

export default NonModalRow;
