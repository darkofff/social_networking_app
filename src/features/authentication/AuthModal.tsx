import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { H3 } from "../../ui/Typography";
import CreateAccountForm from "./CreateAccountForm";
import LoginForm from "./LoginForm";
import { useLogin } from "./useLogin";

function AuthModal() {
  const { login, isPending } = useLogin();
  function onSubmit() {
    login({
      email: "hibapaj241@kravify.com",
      password: "123456",
    });
  }

  return (
    <>
      <Modal>
        <div className="my-5">
          <div className="mb-2">
            <H3>Join today.</H3>
          </div>
          <Modal.Button opens="signup">
            <Button>Create Account</Button>
          </Modal.Button>
          <Modal.Window name="signup">
            <CreateAccountForm />
          </Modal.Window>
        </div>

        <div>
          <div className="mb-2">
            <H3>Already have an accout?</H3>
          </div>
          <Modal.Button opens="login">
            <Button>Log in</Button>
          </Modal.Button>
          <Modal.Window name="login">
            <LoginForm />
          </Modal.Window>
        </div>
      </Modal>
      <Button callback={onSubmit}>Open showcase account</Button>
    </>
  );
}

export default AuthModal;
