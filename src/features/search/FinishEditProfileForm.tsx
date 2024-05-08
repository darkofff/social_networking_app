import ModalFormTemplate from "../../ui/ModalFormTemplate";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { useForm } from "react-hook-form";
import FileInputSearch from "./FileInputSearch";
import { useState } from "react";

type FieldInputCount = 2 | 3 | 4 | 5 | 6;

function FinishEditProfileForm() {
  const { register } = useForm();

  // Handles how many field inputs are displayed.
  // min: 2, max: 6
  const [fieldInputCount, setFieldInputCount] = useState<FieldInputCount>(2);

  function clearPosition() {
    /* // Assuming you have an input field with id "fileInput"
    const fileInput = document.getElementById("fileInput");

    // Clear the input field
    fileInput.value = ""; */
  }

  const title = "Create profile";
  return (
    <ModalFormTemplate title={title} buttonText={title}>
      <FileInputSearch register={register} fieldInputCount={fieldInputCount} />
      <div className="flex items-center">
        <AiOutlineMinusSquare className="h-10 w-10" />
        <p>Remove/remove photo</p>
        <AiOutlinePlusSquare className="h-10 w-10" />
      </div>
    </ModalFormTemplate>
  );
}

export default FinishEditProfileForm;
