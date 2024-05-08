import { UpdateProfileData } from "../../types/UpdateProfileData";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import EditProfileForm from "./EditProfileForm";

function UpdateProfileModal({ dataToUpdate }) {
  return (
    <div className="w-full">
      <Modal>
        <Modal.Window name="edit-profile">
          <EditProfileForm dataToUpdate={dataToUpdate} />
        </Modal.Window>
        <Modal.Button opens="edit-profile">
          <Button>Edit profile</Button>
        </Modal.Button>
      </Modal>
    </div>
  );
}

export default UpdateProfileModal;
