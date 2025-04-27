'use client';
import { useEffect, useState } from 'react';
import { ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EditableImage from '@/ui/profile/editableImage/EditableImage';
import { EditableField } from '@/ui/profile/editableFeild/EditableFeild';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import useAuthStore from '@/store/useAuthStore';
import axios from 'axios';

interface ProfileData {
  fullName: string;
  email: string;
  country: string;
  stateRegion: string;
  phoneNumber: string;
  profileImage: string;
}

export default function ProfileComponent() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    email: '',
    country: '',
    stateRegion: '',
    phoneNumber: '',
    profileImage: '/animoji.svg',
  });

  // Initialize profile data with user data from auth store
  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || '',
        email: user.email || '',
        country: user.country || '',
        stateRegion: user.stateRegion || '',
        phoneNumber: user.phoneNumber || '',
        profileImage: user.profileImage || '/animoji.svg',
      });
    } else if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/auth/login');
    }
  }, [user, isAuthenticated, navigate]);

  const handleImageUpload = async (file: File) => {
    try {
      // In a real app, you would upload to a server and get back a URL
      const imageUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, profileImage: imageUrl }));
    } catch (error) {
      toast.error(`Image upload failed: ${error}`);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      if (!user?.id) {
        toast.error('User ID is missing!');
        return;
      }

      setIsLoading(true);
      toast.info('Saving profile changes...');

      // Update user profile via PATCH request
      const response = await axios.patch(
        `https://trello-trailblazers-backend.onrender.com/api/users/${user.id}`,
        {
          fullName: profileData.fullName,
          email: profileData.email,
          country: profileData.country,
          state: profileData.stateRegion,
          phone_number: profileData.phoneNumber,
          profileImage:
            profileData.profileImage !== '/animoji.svg'
              ? profileData.profileImage
              : undefined,
        }
      );

      // Assuming the response contains updated user data
      const updatedUser = response.data;

      // Update localStorage with the updated user data
      localStorage.setItem(
        'divvy-auth-storage',
        JSON.stringify({
          state: {
            user: updatedUser,
            isAuthenticated: true,
          },
        })
      );

      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(
        `Update failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    // Validate passwords
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    try {
      if (!user?.id) {
        toast.error('User ID is missing!');
        return;
      }

      setIsLoading(true);
      toast.info('Updating password...');

      // Make API call to update password
      await axios.put(`https://trello-trailblazers-backend.onrender.com/api/users/${user.id}/password`, {
        currentPassword,
        newPassword,
      });

      // Reset password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      toast.success('Password updated successfully!');
    } catch (error) {
      toast.error(
        `Password update failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className='hidden w-full h-full container mx-auto p-4 md:block '>
      <div className='w-full h-full flex justify-between mb-8 gap-6'>
        <section className='mx-auto px-4 pb-4 w-full bg-white dark:bg-ash-black rounded-lg'>
          <div className='w-full flex items-center justify-between p-4 rounded-t-lg'>
            <div className='flex items-center gap-4'>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-full'
                onClick={() => navigate('/user')}
              >
                <ArrowLeft className='h-5 w-5' />
              </Button>
              <h1 className='text-2xl font-bold'>
                {profileData.fullName}'s Profile
              </h1>
            </div>

            <Button
              className={`rounded-full ${
                isEditing
                  ? 'bg-sunglow hover:bg-sunglow/50'
                  : 'bg-light-red hover:bg-light-red/50'
              }`}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              disabled={isLoading}
            >
              {isEditing ? (
                <>
                  Update Profile
                  <Edit className='ml-2 h-4 w-4' />
                </>
              ) : (
                <>
                  Edit Profile
                  <Edit className='ml-2 h-4 w-4' />
                </>
              )}
            </Button>
          </div>

          <div className='p-4 rounded-b-lg flex gap-8'>
            <div className='flex-1 space-y-6'>
              <div className='flex justify-between gap-8 items-center mb-8'>
                <EditableImage
                  src={profileData.profileImage}
                  editable={isEditing}
                  onChange={handleImageUpload}
                />
                <div className='w-full grid grid-cols-3 gap-x-2 gap-y-8'>
                  <EditableField
                    label='Full name'
                    value={profileData.fullName}
                    editable={isEditing}
                    onChange={(val) => handleInputChange('fullName', val)}
                  />
                  <EditableField
                    label='Email Address'
                    value={profileData.email}
                    editable={isEditing}
                    onChange={(val) => handleInputChange('email', val)}
                  />
                  <EditableField
                    label='Phone Number'
                    value={profileData.phoneNumber}
                    editable={isEditing}
                    onChange={(val) => handleInputChange('phoneNumber', val)}
                  />
                  <EditableField
                    label='Country'
                    value={profileData.country}
                    editable={isEditing}
                    onChange={(val) => handleInputChange('country', val)}
                  />
                  <EditableField
                    label='State/Region'
                    value={profileData.stateRegion}
                    editable={isEditing}
                    onChange={(val) => handleInputChange('stateRegion', val)}
                  />
                </div>
              </div>
              <div className='p-5 space-y-4'>
                <h2 className='text-xl font-semibold'>Change Password</h2>
                <div className='grid grid-cols-2 gap-x-8 gap-y-5'>
                  <div className='space-y-2'>
                    <Label className='font-medium leading-none'>
                      Current Password
                    </Label>
                    <Input
                      type='password'
                      placeholder='******************'
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label className='font-medium leading-none'>
                      New Password
                    </Label>
                    <Input
                      type='password'
                      placeholder='******************'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label className='font-medium leading-none'>
                      Confirm New Password
                    </Label>
                    <Input
                      type='password'
                      placeholder='******************'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className='space-y-2 self-end'>
                    <Button
                      className='w-64 h-12 bg-light-red hover:bg-light-red/50 rounded-full'
                      onClick={handlePasswordUpdate}
                      disabled={isLoading}
                    >
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
