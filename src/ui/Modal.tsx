/* 
  Modal created using compound components pattern
  Proper way to use:
  
  <Modal>
      <Modal.Window name="name">
          <Some component to display>
      </Modal.Window>
      <Modal.Button opens="name">
          <Some button to open Modal>
      </Modal.Button>
      
      // it's optional how many different modals are to be used
      <Modal.Window name="some_other_name">
          <Some component to display>
      </Modal.Window>
      <Modal.Button opens="some_other_name">
          <Some button to open Modal>
      </Modal.Button>
  
    </Modal>

  # button passed as a child of Modal.Button has to receive callback function prop
    and call it 
  # 
*/

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";

interface ModalContextType {
  openName: string;
  setOpenName: React.Dispatch<React.SetStateAction<string>>;
}

const ModalContext = createContext<null | ModalContextType>(null);

interface ChildrenProps {
  children: React.ReactNode;
}

interface Button {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  opens: string;
}
interface Window {
  children: React.ReactNode;
  name: string;
}

function Button({ children, opens }: Button) {
  const { setOpenName } = useModalContext();

  return cloneElement(children, { callback: () => setOpenName(opens) });
}

function Window({ children, name }: Window) {
  const { openName, setOpenName } = useModalContext();

  const modalRef = useRef<HTMLDivElement | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !windowRef.current?.contains(e.target as Node)) {
        setOpenName("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openName]);

  function handleCloseModal() {
    modalRef.current?.classList.add("modal-animation-close");
    setTimeout(() => {
      setOpenName("");
    }, 500);
  }

  return createPortal(
    <>
      {openName === name && (
        <div
          className={`${"fixed left-0  top-0 z-[1000] h-dvh  w-full  backdrop-blur-sm "}`}
          ref={modalRef}
        >
          <div
            className="absolute left-1/2 top-1/2 h-[98%] w-[96%] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-lg  bg-zinc-100/95  px-6 pb-6 sm:max-h-[650px] sm:w-[600px]"
            ref={windowRef}
          >
            <div className="sticky top-0 flex justify-end  p-1">
              <div
                className="w-fit rounded-md   hover:bg-zinc-200 "
                onClick={handleCloseModal}
              >
                <HiX className="h-10 w-10" />
              </div>
            </div>
            <div className=" flex  min-h-[calc(100%-50px)] items-center ">
              <div className="w-full">{children}</div>
            </div>
          </div>
          {/* <div
            className={`${"absolute left-1/2 top-1/2  h-[98%] w-[96%] max-w-[600px]  -translate-x-1/2  -translate-y-1/2 overflow-y-auto  overscroll-contain rounded-lg border-2 border-orange-800 bg-zinc-100/95 p-2 sm:max-h-[650px] sm:w-[600px] sm:px-8 sm:py-8"} `}
            ref={windowRef}
          >
            <div className="  min-h-[582px] w-full border-2 border-emerald-950 ">
              <div
                className="fixed right-1 top-1 z-50 flex aspect-square h-10 w-10 items-center justify-center rounded-md border-2 border-orange-950 p-4 hover:bg-neutral-200/90"
                onClick={handleCloseModal}
              >
                <HiX className="h-10 w-10" />
              </div>
              {children}
            </div>
          </div> */}
        </div>
      )}
    </>,
    document.body,
  );
  /* return createPortal(
    <>
      {openName === name && (
        <div
          className={`${"fixed left-0  top-0 z-[1000] h-dvh  w-full  backdrop-blur-sm "}`}
          ref={modalRef}
        >
          <div
            className={`${"absolute left-1/2 top-1/2 flex h-[98%] w-[96%] max-w-[600px]  -translate-x-1/2  -translate-y-1/2 overflow-y-auto  overscroll-contain rounded-lg border-2 border-orange-800 bg-zinc-100/95 p-2 sm:max-h-[650px] sm:w-[600px] sm:px-8 sm:py-8"} `}
            ref={windowRef}
          >
            <div className=" min-h-[582px] w-full  border-2 border-emerald-950 ">
              <span
                className="absolute right-1 top-1 z-50 rounded-md  p-4 hover:bg-neutral-200/90"
                onClick={handleCloseModal}
              >
                <HiX className="h-6 w-6" />
              </span>
              {children}
            </div>
          </div>
        </div>
      )}
    </>,
    document.body,
  ); */
}

function Modal({ children }: ChildrenProps) {
  const [openName, setOpenName] = useState<string>("");
  return (
    <ModalContext.Provider value={{ openName, setOpenName }}>
      {children}
    </ModalContext.Provider>
  );
}

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("For some reason context doesn't exist");
  return context;
};

Modal.Button = Button;
Modal.Window = Window;

export default Modal;
