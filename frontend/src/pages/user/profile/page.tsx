import useDeviceSize from "@/hooks/useDeviceSize";
import DesktopProfile from "./desktop/profile";
import MobileProfile from "./mobile/profile";
import ProfileLayout from "@/layout/profileLayout";

export default function Profile() {
  const { isMobile } = useDeviceSize();
  // const { isDesktop } = useDeviceSize();

  return (
    <ProfileLayout>
      {isMobile ? <MobileProfile /> : <DesktopProfile />}
    </ProfileLayout>
  );
}
