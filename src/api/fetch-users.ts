export type User = { id: number; name: string };

export async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users: User[] = await response.json();
  return users;
}
