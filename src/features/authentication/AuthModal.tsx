import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { H3 } from "../../ui/Typography";
import CreateAccountForm from "./CreateAccountForm";
import LoginForm from "./LoginForm";

function AuthModal() {
  return (
    <Modal>
      <div className="my-8">
        <div className="mb-3">
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
        <div className="mb-3">
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
  );
}

export default AuthModal;
