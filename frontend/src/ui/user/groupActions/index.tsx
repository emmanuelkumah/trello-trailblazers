import Actions from "@/components/actions";
import { groupActions } from "../_data";
import { useDivvyGroupStore } from "@/store/GroupStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Action } from "@/types";
import Modal from "@/layout/modal";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

type ActionTypes = {
  show: boolean;
  setShow: (show: boolean) => void;
  groupId: string;
};

type ModalType = 'delete' | 'members' | null;

export default function GroupActions({ show, setShow, groupId }: ActionTypes) {
  const { removeGroup, getGroupById } = useDivvyGroupStore();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<ModalType>(null);
  const group = getGroupById(groupId);

  const toggleModal = useCallback((type: ModalType = null) => {
    setModalType(type);
  }, []);

  const handleDeleteGroup = () => {
    if (groupId) {
      removeGroup(groupId);
      toast.success("Group deleted successfully");
      navigate("/user");
    }
    toggleModal();
  };

  const handleActionClick = (action: Action) => {
    if (!group) return;

    switch (action.id) {
      case 1: // Manage Members
        toggleModal('members');
        break;
      case 2: // Copy Group Code
        navigator.clipboard.writeText(group.code);
        toast.success("Group code copied to clipboard");
        break;
      case 3: // Copy Group Link
        const groupLink = `${window.location.origin}/user/groups/${group.slug}?code=${group.code}`;
        navigator.clipboard.writeText(groupLink);
        toast.success("Group link copied to clipboard");
        break;
      case 4: // Delete Group
        toggleModal('delete');
        break;
      default:
        break;
    }
    setShow(false);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'delete':
        return (
          <>
            <p className="my-3">Are you sure you want to delete <b>{group?.name}</b></p>
            <section className="w-full grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="default"
                className="w-full rounded-full bg-emerald flex items-center gap-2"
                onClick={() => toggleModal()}
              >
                No
                <Icon icon="icon-park-outline:good-two" width={18} height={18} />
              </Button>
              <Button
                type="button"
                variant="default"
                className="w-full rounded-full bg-light-red flex items-center gap-2"
                onClick={handleDeleteGroup}
              >
                Yes
                <Icon icon="icon-park-solid:caution" width={18} height={18} />
              </Button>
            </section>
          </>
        );
      case 'members':
        return (
          <>
            <p className="my-3">Manage members for <b>{group?.name}</b></p>
            <div className="max-h-60 overflow-y-auto">
              {/* Member list would go here */}
              <p className="text-gray-500">Member management interface</p>
            </div>
            <Button
              type="button"
              variant="default"
              className="w-full mt-4 rounded-full bg-emerald flex items-center justify-center gap-2"
              onClick={() => toggleModal()}
            >
              Close
              <Icon icon="icon-park-outline:close" width={18} height={18} />
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'delete':
        return 'Delete a Group';
      case 'members':
        return 'Manage Group Members';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="absolute right-3 md:right-3 mt-10">
        <Actions
          actions={groupActions}
          show={show}
          setShow={setShow}
          onActionClick={(action) => handleActionClick(action as Action)}
          buttonClass={""}
        />
      </div>

      <Modal
        show={!!modalType}
        closeModal={() => toggleModal()}
        isSmall
        title={getModalTitle()}
      >
        {renderModalContent()}
      </Modal>
    </>
  )
}
