import { createContext, useContext, useState } from "react";
import { ChildrenProp } from "../types/ChildrenProp";

interface ContextInterface {
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
}

const ModalOpenContetx = createContext<ContextInterface | null>(null);

function ModalProvider({ children }: ChildrenProp) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  

  return (
    <ModalOpenContetx.Provider value={{ closeModal, openModal, isModalOpen }}>
      {children}
    </ModalOpenContetx.Provider>
  );
}

function useModalOpenContext() {
  const context = useContext(ModalOpenContetx);
  if (!context) throw new Error("Context used outside Provider");
  return context;
}

export { ModalProvider, useModalOpenContext };
