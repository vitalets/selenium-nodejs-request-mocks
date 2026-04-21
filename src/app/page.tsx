'use client';
import { useState, useEffect } from 'react';
import { fetchUsers, User } from '../api/fetch-users';
import UsersList from '../components/users-list';

export default function Page() {
  const [users, setUsers] = useState<User[]>();

  // Fetch users on client
  useEffect(() => {
    fetchUsers().then((users) => setUsers(users));
  }, []);

  return (
    <>
      <h1>Users (client-side API call)</h1>
      <UsersList users={users} />
    </>
  );
}
