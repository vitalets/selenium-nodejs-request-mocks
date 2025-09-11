"use client";
import React, { useEffect } from "react";
import Link from "next/link";

type User = {
  id: number;
  name: string;
};

export default function Page() {
  const [users, setUsers] = React.useState<User[]>();

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data: User[] = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  return (
    <>
      <h1>Users (client-side API call)</h1>
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
