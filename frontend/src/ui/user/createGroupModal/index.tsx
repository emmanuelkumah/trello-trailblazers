import DragAndDropFile from "@/components/dragDrop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/layout/modal";
import { useDivvyGroupStore } from "@/store/GroupStore";
import { ReuseModalTypes } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateGroupModal({ show, onClose }: ReuseModalTypes) {
  const { createGroup } = useDivvyGroupStore();
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileDrop = (files: File | File[] | null) => {
    if (files && !Array.isArray(files)) {
      const file = files;
      const reader = new FileReader();
      
      reader.onload = () => {
        setFormState((prevState) => ({
          ...prevState,
          image: reader.result as string, // Store image as base64 string
        }));
      };
      
      reader.onerror = () => {
        toast.error("Error reading file");
      };
      
      reader.readAsDataURL(file);
    } else {
      toast.error("Please drop a single file.");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, description, image } = formState;
    
    if (name && description && image) {
      try {
        setIsLoading(true);
        await createGroup(name, description, image);
        toast.success("Group created successfully!");
        onClose(); // Close the modal after creating the group
      } catch (error) {
        toast.error("Failed to create group. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <Modal show={show} closeModal={onClose} title="Create New Group">
      <form className="w-full flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <span>
          <label htmlFor="group_title" className="inline-flex mb-2">Group Title</label>
          <Input
            type="text"
            name="name"
            placeholder="Dinner at restaurant"
            value={formState.name}
            onChange={handleInputChange}
          />
        </span>
        <span>
          <label htmlFor="group_desc" className="inline-flex mb-2">Group Description</label>
          <Textarea
            name="description"
            value={formState.description}
            onChange={handleInputChange}
          />
        </span>
        <span>
          <label htmlFor="group_image" className="inline-flex mb-2">Group Image</label>
          <DragAndDropFile
            onFileDrop={handleFileDrop}
          />
          {/* {formState.image && (
            <div className="mt-2">
              <img 
                src={formState.image} 
                alt="Group preview" 
                className="w-16 h-16 object-cover rounded-md" 
              />
            </div>
          )} */}
        </span>

        <section className="w-full grid grid-cols-2 gap-4">
          <Button 
            variant="default" 
            size="lg" 
            className="w-full bg-gray-400 flex gap-3 rounded-full" 
            onClick={onClose}
            disabled={isLoading}
            type="reset"
          >
            Cancel
            <Icon icon="tabler:cancel" width={24} height={24} />
          </Button>

          <Button 
            type="submit" 
            variant="default" 
            size="lg" 
            className="w-full bg-light-red flex gap-3 rounded-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Group'}
            <Icon icon="mdi:users-add-outline" width={24} height={24} />
          </Button>
        </section>
      </form>
    </Modal>
  )
}
