"use client";
import { useState } from "react";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditableImage from "@/ui/profile/editableImage/EditableImage";
import { EditableField } from "@/ui/profile/editableFeild/EditableFeild";
import NotificationItem from "@/ui/profile/notificationItem/page";

interface ProfileData {
  fullName: string;
  email: string;
  nationality: string;
  stateRegion: string;
  phoneNumber: string;
  profileImage: string;
}

export default function ProfileComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Franklin",
    email: "franklin@email.com",
    nationality: "Nigerian",
    stateRegion: "Enugu",
    phoneNumber: "+2549181027196",
    profileImage: "/animoji.svg",
  });

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, profileImage: imageUrl }));
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      console.log("Saving:", profileData);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="hidden min-h-screen container mx-auto p-4 md:block">
      <div className="flex justify-between mb-8">
        {/* Left section */}
        <section className="mx-auto px-4 pb-4 w-full rounded-lg">
          <div className="bg-white flex items-center justify-between p-4 rounded-t-lg">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold">Franklin's Profile</h1>
            </div>

            <Button
              className={`rounded-full ${
                isEditing
                  ? "bg-sunglow hover:bg-sunglow/50"
                  : "bg-light-red hover:bg-light-red/50"
              }`}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {isEditing ? (
                <>
                  Update Profile
                  <Edit className="mr-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Edit Profile
                  <Edit className="mr-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <div className="bg-white p-4 rounded-b-lg flex gap-8">
            <div className="flex-1 space-y-6">
              <div className="flex justify-between gap-8 items-center mb-8">
                <EditableImage
                  src={profileData.profileImage}
                  editable={isEditing}
                  onChange={handleImageUpload}
                />

                <div className="w-full grid grid-cols-3 gap-y-8">
                  <EditableField
                    label="Full name"
                    value={profileData.fullName}
                    editable={isEditing}
                    onChange={(val) => handleInputChange("fullName", val)}
                  />
                  <EditableField
                    label="Email Address"
                    value={profileData.email}
                    editable={isEditing}
                    onChange={(val) => handleInputChange("email", val)}
                  />
                  <ProfileField label="Phone Number" value="+2549181027196" />
                  <ProfileField label="Nationality" value="Nigerian" />
                  <ProfileField label="State/Region" value="Enugu" />
                </div>
              </div>

              <div className="p-5 space-y-4">
                <h2 className="text-xl font-semibold">Change Password</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      Current Password
                    </label>
                    <Input type="password" placeholder="******************" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      New Password
                    </label>
                    <Input type="password" placeholder="******************" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      Confirm New Password
                    </label>
                    <Input type="password" placeholder="******************" />
                  </div>

                  <div className="space-y-2 self-end">
                    <Button className="max-w-52 h-12 bg-light-red hover:bg-light-red/50 rounded-full">
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right section */}
        <section className="w-80">
          <div className="bg-white space-y-4 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <div className="space-y-4">
              <NotificationItem
                title="Marcel created new expense"
                group="Fancunda Group"
                time="Just Now"
              />
              <NotificationItem
                title="New Comment"
                group="Pretty Boyz"
                time="3 mins ago"
              />
              <NotificationItem
                title="Made a contribution"
                group="Bonnie & Clyde"
                time="1 week ago"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Reusable components

type ProfileFieldProps = {
  label: string;
  value: string;
};

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-900 dark:text-white">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}
