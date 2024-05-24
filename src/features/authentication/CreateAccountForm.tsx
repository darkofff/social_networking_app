import { useForm } from "react-hook-form";

import { CreateAccData } from "../../types/CreateAccData";

import { useCreateAccount } from "./useCreateAccount";

import ModalFormTemplate from "../../ui/ModalFormTemplate";
import FormRow from "../../ui/FormRow";

function CreateAccountForm() {
  const { register, handleSubmit, reset } = useForm<CreateAccData>();

  const { signup, isPending } = useCreateAccount();
  
  async function onSubmit(formData: CreateAccData) {
    console.log();
    signup(formData, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <ModalFormTemplate
      title="Create account"
      buttonText="Sign up"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="w-full"
        />
        <label htmlFor="email">Email:</label>
      </FormRow>
      <FormRow>
        <input type="password" {...register("password")} className="w-full" />
        <label htmlFor="password">Password:</label>
      </FormRow>
    </ModalFormTemplate>
  );
}

export default CreateAccountForm;
