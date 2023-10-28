import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import app from "../firebase.config";
import utils from "../utils/date";
import User from "../types/User";
import UserCard from "./UserCard";

const UserPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const listUsers = async () => {
    console.log("run listUsers");
    const db = getFirestore(app);
    const userCol = collection(db, "users");
    const snapshot = await getDocs(userCol);
    setUsers(
      snapshot.docs.map((doc) => {
        const date = doc.data().lastSeen.toDate();
        const user: User = {
          name: doc.data().name,
          email: doc.data().email,
          lastSeen: utils.formatDate(date),
        };
        console.log(user);
        return user;
      }),
    );
  };

  useEffect(() => {
    console.log("run");
    return () => {
      listUsers();
    };
  }, []);

  return (
    <div>
      {users.map((user: User, idx: number) => (
        <UserCard user={user} key={idx} />
      ))}
    </div>
  );
};

export default UserPanel;
