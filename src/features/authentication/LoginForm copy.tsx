import { useForm } from "react-hook-form";
import { H1 } from "../../ui/Typography";
import { useLogin } from "./useLogin";

import { LoginData } from "../../types/LoginData";

import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

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
  );
}

export default LoginForm;

/* 
{
    "user": {
        "id": "bc6911f5-751b-45ef-81c9-e947d9bd858d",
        "aud": "authenticated",
        "role": "authenticated",
        "email": "thirdman1337@gmail.com",
        "email_confirmed_at": "2024-04-03T09:58:58.413665Z",
        "phone": "",
        "confirmation_sent_at": "2024-04-03T09:57:59.586732Z",
        "confirmed_at": "2024-04-03T09:58:58.413665Z",
        "last_sign_in_at": "2024-04-03T10:42:46.698670879Z",
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
                "last_sign_in_at": "2024-04-03T09:57:59.575539Z",
                "created_at": "2024-04-03T09:57:59.575586Z",
                "updated_at": "2024-04-03T09:57:59.575586Z",
                "email": "thirdman1337@gmail.com"
            }
        ],
        "created_at": "2024-04-03T09:57:59.5634Z",
        "updated_at": "2024-04-03T10:42:46.704293Z",
        "is_anonymous": false
    },
    "session": {
        "access_token": "eyJhbGciOiJIUzI1NiIsImtpZCI6Im1JUjFkUlVGc0lFdERzMHkiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEyMTQ0NTY2LCJpYXQiOjE3MTIxNDA5NjYsImlzcyI6Imh0dHBzOi8vYXVza2NiZ3h4cXFtZnpmYmZjZHkuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImJjNjkxMWY1LTc1MWItNDVlZi04MWM5LWU5NDdkOWJkODU4ZCIsImVtYWlsIjoidGhpcmRtYW4xMzM3QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJ0aGlyZG1hbjEzMzdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6ImJjNjkxMWY1LTc1MWItNDVlZi04MWM5LWU5NDdkOWJkODU4ZCJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzEyMTQwOTY2fV0sInNlc3Npb25faWQiOiJhMDVhYjBkMy01YjlkLTQ5MTgtODkwNy02NTcwYmU5NTI2MGQiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.IRd7T6R8Bm4SQ2If2_HvgT4lxeYXCSslHeXmBspEzek",
        "token_type": "bearer",
        "expires_in": 3600,
        "expires_at": 1712144566,
        "refresh_token": "KPDWM-fF-FRhCuYH2YxfYg",
        "user": {
            "id": "bc6911f5-751b-45ef-81c9-e947d9bd858d",
            "aud": "authenticated",
            "role": "authenticated",
            "email": "thirdman1337@gmail.com",
            "email_confirmed_at": "2024-04-03T09:58:58.413665Z",
            "phone": "",
            "confirmation_sent_at": "2024-04-03T09:57:59.586732Z",
            "confirmed_at": "2024-04-03T09:58:58.413665Z",
            "last_sign_in_at": "2024-04-03T10:42:46.698670879Z",
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
                    "last_sign_in_at": "2024-04-03T09:57:59.575539Z",
                    "created_at": "2024-04-03T09:57:59.575586Z",
                    "updated_at": "2024-04-03T09:57:59.575586Z",
                    "email": "thirdman1337@gmail.com"
                }
            ],
            "created_at": "2024-04-03T09:57:59.5634Z",
            "updated_at": "2024-04-03T10:42:46.704293Z",
            "is_anonymous": false
        }
    }
}
*/
