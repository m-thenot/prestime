"use client";

interface IHomePageProps {
  users: any[];
}

const HomePage: React.FC<IHomePageProps> = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </>
  );
};

export default HomePage;
