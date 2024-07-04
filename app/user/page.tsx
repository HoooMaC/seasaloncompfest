import ProfileSection from '@/components/User/ProfileSection';
import { CardHeader, CardTitle } from '@/components/ui/card';

const UserDashboard = () => {
  return (
    <>
      <CardHeader>
        <CardTitle className='max-md:mx-auto'>Profile</CardTitle>
      </CardHeader>
      <ProfileSection />
    </>
  );
};
export default UserDashboard;
