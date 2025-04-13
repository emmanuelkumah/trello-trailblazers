import DragAndDropFile from "@/components/dragDrop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/layout/modal";
import { ReuseModalTypes } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";



export default function CreateGroupModal({ show, onClose }: ReuseModalTypes) {
  return (
    <Modal show={show} closeModal={onClose} title="Create New Group">
      <form className="w-full flex flex-col gap-4">
        <span>
          <label htmlFor="group_title" className="inline-flex mb-2">Group Title</label>
          <Input
            type="text"
            placeholder="Dinner at restaurant"
          />
        </span>
        <span>
          <label htmlFor="group_desc" className="inline-flex mb-2">Group Description</label>
          <Textarea />
        </span>
        <span>
          <label htmlFor="group_image" className="inline-flex mb-2">Group Image</label>
          <DragAndDropFile
            onFileDrop={() => { }}
          />
        </span>

        <section className="w-full grid grid-cols-2 gap-4">
          <Button variant="default" size="lg" className="w-full bg-gray-400 flex gap-3 rounded-full">
            Cancel
            <Icon icon="tabler:cancel" width={24} height={24} />
          </Button>
          
          <Button variant="default" size="lg" className="w-full bg-light-red flex gap-3 rounded-full">
            Create Group
            <Icon icon="mdi:users-add-outline" width={24} height={24} />
          </Button>
        </section>
      </form>
    </Modal>
  )
}
