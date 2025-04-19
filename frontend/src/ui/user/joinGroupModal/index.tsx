import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/layout/modal";
import { ReuseModalTypes } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";



export default function JoinGroupModal({ show, onClose }: ReuseModalTypes) {
  return (
    <Modal show={show} closeModal={onClose} title="Join a group" isSmall>
      <form className="w-full flex flex-col gap-4">
        <span>
          <label htmlFor="group_title" className="inline-flex mb-2">Enter Group Code</label>
          <Input
            type="text"
            placeholder="e.g. CH7IAZP"
          />
        </span>

        <span className="w-max mx-auto"> OR </span>

        <span>
          <h5>Join Via Link</h5>
          <p>
            If you received an invitation link, simply click on it to join the group automatically.
          </p>
        </span>

        <section className="w-full grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="default"
            size="lg"
            className="w-full bg-gray-400 flex gap-3 rounded-full"
            onClick={onClose}
          >
            Cancel
            <Icon icon="tabler:cancel" width={24} height={24} />
          </Button>

          <Button type="button" variant="default" size="lg" className="w-full bg-mustard flex gap-3 rounded-full">
            Join Group
            <Icon icon="mdi:users-add-outline" width={24} height={24} />
          </Button>
        </section>
      </form>
    </Modal>
  )
}
