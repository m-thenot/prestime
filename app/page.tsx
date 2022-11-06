import HomePage from "@features/HomePage";

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return users;
}

export default async function Page() {
  const users = await getUsers();

  return <HomePage users={users} />;
}
