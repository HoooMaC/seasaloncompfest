import { auth } from '@/auth';
import { SignOutAction } from '@/actions/SignOutAction';
import styles from '@/components/Navbar.module.css';
import { Button } from '@/components/ui/button';

const UserDashboard = async () => {
  const session = await auth();
  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <form action={SignOutAction}>
        <Button type='submit'>SignOut</Button>
      </form>
    </>
  );
};
export default UserDashboard;
