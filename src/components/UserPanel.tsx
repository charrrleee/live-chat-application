import { useEffect, useState } from "react";
import User from "../types/User";
import UserCard from "./UserCard";
import fsUser from "../firebase/firestore/user";

const UserPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const handleListUser = (fbUsers: User[]) => {
    setUsers(fbUsers);
  };

  useEffect(() => {
    const unsubscribe = fsUser.listUser(handleListUser);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="p-3">
      {users.map((user: User, idx: number) => (
        <UserCard user={user} key={idx} />
      ))}
    </div>
  );
};

export default UserPanel;
