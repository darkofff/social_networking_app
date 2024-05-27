import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import NonModalRow from "../../ui/NonModalRow";
import Button from "../../ui/Button";
import { RegisterData } from "../../types/RegisterData";
import { useRegisterAccount } from "./useRegisterAccount";

function RegisterAccount() {
  const { register, handleSubmit } = useForm<RegisterData>();
  const { registerAccount, isPending } = useRegisterAccount();

  function onSubmit(data: RegisterData) {
    registerAccount(data);
  }

  return (
    <NonModalRow>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <input
            type="text"
            id="name"
            placeholder="Name..."
            {...register("name")}
          />
          <label htmlFor="name">Imię</label>
        </FormRow>
        <FormRow>
          <input
            type="text"
            id="last_name"
            placeholder="Last name..."
            {...register("last_name")}
          />
          <label htmlFor="last_name">Nazwisko </label>
        </FormRow>
        <FormRow>
          <input
            type="text"
            id="username"
            {...register("username")}
            placeholder="Oryginal username..."
          />
          <label htmlFor="username">Unikalna nazwa użytkownika </label>
        </FormRow>
        <Button type="submit">Register account</Button>
        <Button>Logout, I'll finish my account later</Button>
      </form>
    </NonModalRow>
  );
}

export default RegisterAccount;
