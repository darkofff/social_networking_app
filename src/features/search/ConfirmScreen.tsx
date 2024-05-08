import { createPortal } from "react-dom";
import NonModalRow from "../../ui/NonModalRow";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { H3 } from "../../ui/Typography";
import FinishEditProfileForm from "./FinishEditProfileForm";

interface Props {
  confirm: () => void;
}

function ConfirmScreen({ confirm }: Props) {
  const isAccountDone = false;
  return createPortal(
    <div className="  pb-[64px] md:pb-0">
      <NonModalRow>
        {!!isAccountDone && (
          <div className="my-6">
            <div className="mb-3">
              <H3>Have fun!</H3>
            </div>
            <Button callback={confirm}>Search for friends</Button>
          </div>
        )}
        <div>
          <div className="mb-3">
            <H3>
              {isAccountDone
                ? "Or edit your profile"
                : "Before searching for friends set up your account"}
            </H3>
          </div>
          <Modal>
            <Modal.Button opens="search-profile">
              <Button>
                {isAccountDone ? "Edit profile" : "Finish setting your account"}
              </Button>
            </Modal.Button>
            <Modal.Window name="search-profile">
              <FinishEditProfileForm />
            </Modal.Window>
          </Modal>
        </div>
      </NonModalRow>
    </div>,
    document.body,
  );
}

export default ConfirmScreen;
