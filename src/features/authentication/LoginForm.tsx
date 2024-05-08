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
          placeholder="Enter you email adress..."
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

/* 
<div className="mx-auto flex h-full flex-col justify-center space-y-20   ">
      <H1>Login </H1>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <FormRow>
          <input
            type="email"
            id="email"
            placeholder="Enter you email adress..."
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
        <div>
          <Button type="submit" disabled={false}>
            Login
          </Button>
        </div>
      </form>
    </div>
*/
