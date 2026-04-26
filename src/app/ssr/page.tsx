import { fetchUsers } from '../../api/users';
import UsersList from '../../components/users-list';

export default async function Page() {
  // Fetch users on server
  const data = await fetchUsers();

  return <UsersList data={data} />;
}
