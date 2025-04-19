import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CreateGroupModal from "../../createGroupModal";
import JoinGroupModal from "../../joinGroupModal";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    id: 'create-group',
    label: 'CREATE GROUP',
    icon: 'fluent:cube-add-20-filled',
    color: '#FF6B6B'
  },
  {
    id: 'join-group',
    label: 'JOIN GROUP',
    icon: 'mdi:users-add-outline',
    color: '#FF6B6B'
  },
  {
    id: 'profile-settings',
    label: 'PROFILE SETTINGS',
    icon: 'grommet-icons:user-settings',
    color: '#FF6B6B'
  }
];

export default function ActionsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const navigate = useNavigate();

  const handleActionClick = (id: string) => {
    setIsOpen(false); // Close the menu first
    
    switch (id) {
      case 'create-group':
        setShowCreateModal(true);
        break;
      case 'join-group':
        setShowJoinModal(true);
        break;
      case 'profile-settings':
        navigate('/user/profile');
        break;
    }
  };

  return (
    <div className="block md:hidden">
      <CreateGroupModal 
        show={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
      
      <JoinGroupModal 
        show={showJoinModal} 
        onClose={() => setShowJoinModal(false)} 
      />

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black backdrop-blur-lg z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-24 right-6 z-50 flex flex-col gap-4"
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-end gap-2 py-2"
                  onClick={() => handleActionClick(item.id)}
                >
                  <span className="text-sm font-semibold text-light-red bg-white rounded-3xl p-3">{item.label}</span>
                  <span className="w-15 h-15 bg-white flex items-center justify-center rounded-full">
                    <Icon icon={item.icon} width={24} height={24} color={item.color} />
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        role="button"
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-15 w-15 flex items-center justify-center rounded-full bg-light-red shadow-md"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon icon="tdesign:focus" width={32} height={32} color="#f2f2f2" />
        </motion.div>
      </motion.button>
    </div>
  );
}
