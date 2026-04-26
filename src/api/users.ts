export type User = {
  id: number;
  name: string;
};

export type FetchUsersResponse = { users: User[] } | { error: string };

export async function fetchUsers(): Promise<FetchUsersResponse> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=6', {
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = `${response.status} ${response.statusText}`;
    return { error };
  }

  const users: User[] = await response.json();
  return { users };
}
