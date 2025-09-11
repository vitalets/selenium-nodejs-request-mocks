import Link from "next/link";

type User = {
  id: number;
  name: string;
};

export default async function Page() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await response.json();

  return (
    <>
      <h1>Users (server-side API call)</h1>
      <ul id="users-list">
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <p>
        <Link href="/">Back to home</Link>
      </p>
    </>
  );
}
