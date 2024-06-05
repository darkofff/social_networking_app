import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";

import { LoginData } from "../../types/LoginData";

import FormRow from "../../ui/FormRow";
import ModalFormTemplate from "../../ui/ModalFormTemplate";

function LoginForm() {
  const { register, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      email: "hibapaj241@kravify.com",
      password: "123456",
    },
  });

  const { login, isPending } = useLogin();

  function onSubmit(formData: LoginData) {
    login(formData);
  }

  return (
    <ModalFormTemplate
      title="Login"
      buttonText="Login"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow>
        <input
          type="email"
          id="email"
          placeholder="Enter you email address..."
          {...register("email")}
          className="w-full"
        />
        <label htmlFor="email">Email</label>
      </FormRow>
      <FormRow>
        <input
          type="password"
          {...register("password")}
          className="w-full"
          placeholder="Enter your password..."
        />
        <label htmlFor="password">Password</label>
      </FormRow>
    </ModalFormTemplate>
  );
}

export default LoginForm;
