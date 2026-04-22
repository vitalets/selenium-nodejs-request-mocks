import Link from 'next/link';
import { User } from '../api/users';

export default function UsersList({ users }: { users?: User[] }) {
  return (
    <>
      {users ? (
        <ul id="users-list">
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <i>Loading...</i>
      )}
      <p>
        <Link href="/">Back to home</Link>
      </p>
    </>
  );
}
