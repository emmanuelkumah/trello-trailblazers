import { useState } from "react";
import { ArrowLeft, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import EditableImage from "@/ui/profile/editableImage/EditableImage";

export default function EditProfileMobile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: "Franklin",
    email: "franklin@email.com",
    nationality: "Nigerian",
    stateRegion: "Enugu",
    phoneNumber: "+2549181027196",
    profileImage: "/animoji.svg",
  });
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setProfileData((prev) => ({ ...prev, profileImage: imageUrl }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Add your save logic here
    navigate(-1); // Go back to profile page
  };

  return (
    <div className="bg-white p-6 min-h-screen rounded-lg shadow-sm max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h5 className="text-xl font-medium ml-2">Edit Profile</h5>
      </div>

      <div className="flex justify-center w-full mb-6">
        <EditableImage
          src={profileData.profileImage}
          editable={true}
          onChange={handleImageUpload}
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-base font-medium">Full Name</label>
          <Input
            value={profileData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="w-full bg-platinum"
          />
        </div>

        <div className="space-y-2">
          <label className="text-base font-medium">Email</label>
          <Input
            value={profileData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full text-ash-black bg-platinum"
            type="email"
          />
        </div>

        <div className="space-y-2">
          <div>
            <label className="mb-6 text-platinum text-base" htmlFor="">
              Phone Number
            </label>
            <p className="text-base">{profileData.phoneNumber}</p>
          </div>

          <div>
            <label className="mb-6 text-platinum text-base" htmlFor="">
              Nationality
            </label>
            <p className="text-base">{profileData.nationality}</p>
          </div>

          <div>
            <label className="mb-6 text-platinum text-base" htmlFor="">
              State/Region
            </label>
            <p className="text-base">{profileData.stateRegion}</p>
          </div>
        </div>

        <Button
          className={`w-full rounded-full py-5 mt-6 ${
            !hasChanges ? "bg-light-red" : "bg-light-red hover:bg-mustard"
          }`}
          disabled={!hasChanges}
          onClick={handleSave}
        >
          Update Profile
          <CheckCheck className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
