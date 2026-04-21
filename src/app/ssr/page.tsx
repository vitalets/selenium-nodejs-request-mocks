import { fetchUsers } from '../../api/fetch-users';
import UsersList from '../../components/users-list';

export default async function Page() {
  // Fetch users on server
  const users = await fetchUsers();

  return (
    <>
      <h1>Users (server-side API call)</h1>
      <UsersList users={users} />
    </>
  );
}
