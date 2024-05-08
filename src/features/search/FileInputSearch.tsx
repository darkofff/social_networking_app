import { FieldValues, UseFormRegister } from "react-hook-form";
import FormRow from "../../ui/FormRow";

interface Props {
  register: UseFormRegister<FieldValues>;
  fieldInputCount: 2 | 3 | 4 | 5 | 6;
}

function FileInputSearch({ register, fieldInputCount }: Props) {
  return (
    <div className="flex w-full items-center">
      <div className="grow">
        <FormRow type="file">
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            {...register("image-1")}
            id="image-1"
          />
          <label htmlFor="image-1">Image 1</label>
        </FormRow>
      </div>
      <div className="border">Clear</div>
    </div>
  );
}

export default FileInputSearch;
