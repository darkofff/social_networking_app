import { createPortal } from "react-dom";

import NonModalRow from "../../ui/NonModalRow";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import FinishEditProfileForm from "./FinishEditProfileForm";
import { H3 } from "../../ui/Typography";
import { useNavigate } from "react-router-dom";

interface Props {
  is_profile_created: boolean;
  profileData: any;
  isPending: boolean;
}

function ConfirmScreen({ is_profile_created, profileData, isPending }: Props) {
  const navigate = useNavigate();

  return createPortal(
    <div className="md:pb-0">
      <NonModalRow>
        {!!is_profile_created && (
          <div className="my-6">
            <div className="mb-3">
              <H3>Have fun!</H3>
            </div>
            <Button callback={() => navigate("/search")}>
              Search for friends
            </Button>
          </div>
        )}
        <div>
          <div className="mb-3">
            <H3>
              {is_profile_created
                ? "Or edit your profile"
                : "Before searching for friends set up your account"}
            </H3>
          </div>
          <Modal>
            <Modal.Button opens="search-profile">
              <Button>
                {is_profile_created
                  ? "Edit profile"
                  : "Finish setting up your account"}
              </Button>
            </Modal.Button>
            <Modal.Window name="search-profile">
              <FinishEditProfileForm
                profileData={profileData}
                isPending={isPending}
                is_profile_created={is_profile_created}
              />
            </Modal.Window>
          </Modal>
        </div>
      </NonModalRow>
    </div>,
    document.body,
  );
}

export default ConfirmScreen;
