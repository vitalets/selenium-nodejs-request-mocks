import { FetchUsersResponse } from '../api/users';

export default function UsersList({ data }: { data?: FetchUsersResponse }) {
  if (!data) {
    return <i>Loading...</i>;
  }

  if ('error' in data) {
    return <div className="error">Error: {data.error}</div>;
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
        <div className="empty">No users found.</div>
      )}
    </>
  );
}
