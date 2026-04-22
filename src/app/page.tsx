'use client';
import { useState, useEffect } from 'react';
import { fetchUsers, FetchUsersResponse } from '../api/users';
import UsersList from '../components/users-list';

export default function Page() {
  const [data, setData] = useState<FetchUsersResponse>();

  // Fetch users on client
  useEffect(() => {
    fetchUsers().then((data) => setData(data));
  }, []);

  return (
    <>
      <h1>Users (client-side API call)</h1>
      <UsersList data={data} />
    </>
  );
}
