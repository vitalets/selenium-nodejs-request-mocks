import { FetchUsersResponse } from '../api/users';
import Avatar from './avatar';

export default function UsersList({ data }: { data?: FetchUsersResponse }) {
  if (!data) {
    return <div className="loading-state">Loading users...</div>;
  }

  if ('error' in data) {
    return <div className="error">Error: {data.error}</div>;
  }

  return (
    <>
      {data.users.length ? (
        <ul className="users">
          {data.users.map((user) => (
            <li key={user.id}>
              <Avatar userId={user.id} />
              <div className="user-details">
                <span className="user-name">{user.name}</span>
                <small>User #{user.id}</small>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">No users found.</div>
      )}
    </>
  );
}
