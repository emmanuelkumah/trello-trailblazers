import { useState } from "react";
import { ArrowLeft, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordMobile() {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    const newPasswords = { ...passwords, [field]: value };
    setPasswords(newPasswords);

    // Validate all fields are filled and new passwords match
    setIsValid(
      newPasswords.current.length > 0 &&
        newPasswords.new.length > 0 &&
        newPasswords.confirm.length > 0 &&
        newPasswords.new === newPasswords.confirm
    );
  };

  const handleSubmit = () => {
    // Add your password change logic here
    navigate(-1); // Go back to profile page
  };

  return (
    <div className="bg-white p-6 min-h-screen rounded-lg shadow-sm max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h5 className="text-xl font-medium ml-2">Change Password</h5>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-base font-medium">Current Password</label>
          <Input
            placeholder="******************"
            value={passwords.current}
            onChange={(e) => handleInputChange("current", e.target.value)}
            type="password"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-base font-medium">New Password</label>
          <Input
            placeholder="******************"
            value={passwords.new}
            onChange={(e) => handleInputChange("new", e.target.value)}
            type="password"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-base font-medium">Confirm New Password</label>
          <Input
            placeholder="******************"
            value={passwords.confirm}
            onChange={(e) => handleInputChange("confirm", e.target.value)}
            type="password"
            className="w-full"
          />
        </div>

        <Button
          className={`w-full rounded-full py-5 mt-6 ${
            !isValid ? "bg-light-red" : "bg-[#FF6B6B] hover:bg-[#FF6B6B]/90"
          }`}
          disabled={!isValid}
          onClick={handleSubmit}
        >
          Update Password
          <SquarePen className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
