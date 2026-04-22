import { FetchUsersResponse } from '../api/users';

export default function UsersList({ data }: { data?: FetchUsersResponse }) {
  if (!data) {
    return <i>Loading...</i>;
  }

  if ('error' in data) {
    return <i>Error: {data.error}</i>;
  }

  return (
    <>
      {data.users.length ? (
        <ul id="users-list">
          {data.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <i>No users found.</i>
      )}
    </>
  );
}
