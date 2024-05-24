import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import EditProfileForm from "./EditProfileForm";
import { DataToUpdate } from "./profileTypes";

function UpdateProfileModal({ dataToUpdate }: DataToUpdate) {
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
