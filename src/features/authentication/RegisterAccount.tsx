import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import NonModalRow from "../../ui/NonModalRow";
import Button from "../../ui/Button";
import { RegisterData } from "../../types/RegisterData";
import { useRegisterAccount } from "./useRegisterAccount";
import { useLogout } from "../../hooks/useLogout";

function RegisterAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();
  const { registerAccount, isPending } = useRegisterAccount();

  const { logout } = useLogout();

  function onSubmit(data: RegisterData) {
    registerAccount(data);
  }
  function onError() {
    console.log("click");
  }

  return (
    <NonModalRow>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow>
          <input
            type="text"
            id="name"
            placeholder="Name..."
            {...register("name", { required: true, minLength: 1 })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          <label htmlFor="name">Imię</label>
          {errors.name?.type === "required" && (
            <p className="pl-2 font-semibold text-red-700" role="alert">
              Name is required
            </p>
          )}
        </FormRow>
        <FormRow>
          <input
            type="text"
            id="last_name"
            placeholder="Last name..."
            {...register("last_name")}
          />
          {errors.last_name?.type === "required" && (
            <p className="pl-2 font-semibold text-red-700" role="alert">
              First name is required
            </p>
          )}
          <label htmlFor="last_name">Nazwisko </label>
        </FormRow>
        <FormRow>
          <input
            type="text"
            id="username"
            {...register("username", { required: true, minLength: 3 })}
            placeholder="Unique username..."
            aria-invalid={errors.username ? "true" : "false"}
          />
          {errors.username?.type === "required" && (
            <p className="pl-2 font-semibold text-red-700" role="alert">
              First name is required
            </p>
          )}
          <label htmlFor="username">Oryginalne nazwa użytkownika </label>
        </FormRow>
        <Button type="submit">Register account</Button>
        <Button callback={logout}>Logout, I'll finish my account later</Button>
      </form>
    </NonModalRow>
  );
}

export default RegisterAccount;
