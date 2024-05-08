import { useForm } from "react-hook-form";

import { CreateAccData } from "../../types/CreateAccData";

import { useCreateAccount } from "./useCreateAccount";

import Button from "../../ui/Button";
import { H1 } from "../../ui/Typography";
import ModalFormTemplate from "../../ui/ModalFormTemplate";
import FormRow from "../../ui/FormRow";

function CreateAccountForm() {
  const { register, handleSubmit, formState, reset } = useForm<CreateAccData>();

  const { signup, isPending } = useCreateAccount();

  async function onSubmit(formData: CreateAccData) {
    console.log()
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
  /* return (
    <div className="mx-auto flex h-full flex-col space-y-10 border border-black">
      <H1>Create account </H1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <span>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full"
          />
        </span>
        <span>
          <label htmlFor="password">Password:</label>
          <input type="password" {...register("password")} className="w-full" />
        </span>

        <Button type="submit" disabled={false}>
          {!isPending ? "Submit" : "Wait..."}
        </Button>
      </form>
    </div>
  ); */
}

export default CreateAccountForm;

/* 
{
    "user": {
        "id": "bc6911f5-751b-45ef-81c9-e947d9bd858d",
        "aud": "authenticated",
        "role": "authenticated",
        "email": "thirdman1337@gmail.com",
        "phone": "",
        "confirmation_sent_at": "2024-04-03T09:57:59.586732493Z",
        "app_metadata": {
            "provider": "email",
            "providers": [
                "email"
            ]
        },
        "user_metadata": {
            "email": "thirdman1337@gmail.com",
            "email_verified": false,
            "phone_verified": false,
            "sub": "bc6911f5-751b-45ef-81c9-e947d9bd858d"
        },
        "identities": [
            {
                "identity_id": "411a1d37-9039-47e8-b0af-130b5e3e5a2f",
                "id": "bc6911f5-751b-45ef-81c9-e947d9bd858d",
                "user_id": "bc6911f5-751b-45ef-81c9-e947d9bd858d",
                "identity_data": {
                    "email": "thirdman1337@gmail.com",
                    "email_verified": false,
                    "phone_verified": false,
                    "sub": "bc6911f5-751b-45ef-81c9-e947d9bd858d"
                },
                "provider": "email",
                "last_sign_in_at": "2024-04-03T09:57:59.575539067Z",
                "created_at": "2024-04-03T09:57:59.575586Z",
                "updated_at": "2024-04-03T09:57:59.575586Z",
                "email": "thirdman1337@gmail.com"
            }
        ],
        "created_at": "2024-04-03T09:57:59.5634Z",
        "updated_at": "2024-04-03T09:58:01.093538Z",
        "is_anonymous": false
    },
    "session": null
}
*/

//thirdman1337
//123456
