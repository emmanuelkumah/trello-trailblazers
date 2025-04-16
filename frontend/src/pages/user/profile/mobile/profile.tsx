import { LogOut, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Outlet, useNavigate } from "react-router-dom";
import EditableImage from "@/ui/profile/editableImage/EditableImage";

export default function MobileProfile() {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 min-h-screen rounded-lg shadow-sm max-w-md mx-auto md:hidden">
      <div className="flex justify-center w-full mb-3">
        <EditableImage
          src="/animoji.svg"
          editable={false}
          onChange={() => {}}
        />
      </div>

      <h5 className="text-2xl font-medium text-center mb-6">User Profile</h5>

      <div className="space-y-4">
        <Button
          variant="ghost"
          className="w-full border border-[#00000040] rounded-[8px] justify-between px-4 hover:bg-gray-50"
          onClick={() => navigate("edit")}
        >
          <div className="flex items-center gap-3">
            <span className="text-gray-800">Edit Profile Details</span>
          </div>
          <ArrowRight className="h-6 w-6 text-black" />
        </Button>

        <Button
          variant="ghost"
          className="w-full border border-[#00000040] rounded-[8px] justify-between px-4 hover:bg-gray-50"
          onClick={() => navigate("change-password")}
        >
          <div className="flex items-center gap-3">
            <span className="text-gray-800">Change Password</span>
          </div>
          <ArrowRight className="h-6 w-6 text-black" />
        </Button>

        <Button
          variant="ghost"
          className="w-full border border-[#FF6B6B] rounded-[8px] justify-between px-4 text-[#FF6B6B] hover:bg-red-50"
        >
          <span>Log Out</span>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      <Outlet />
    </div>
  );
}
