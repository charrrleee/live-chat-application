import {
  Timestamp,
  Unsubscribe,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import app from "./firebase.config";
import User from "../../types/User";

const createUser = async (user: User) => {
  console.log(`createUser run`);
  const db = getFirestore(app);
  const target = doc(db, "users", user.email);
  const timestamp = Timestamp.fromDate(user.lastSeen);

  await setDoc(
    target,
    {
      name: user.name,
      email: user.email,
      lastSeen: timestamp,
    },
    { merge: true },
  );
};

const listUser = (handleListUser: (docs: User[]) => void): Unsubscribe => {
  const db = getFirestore(app);

  const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
    const users = snapshot.docs.map((doc) => {
      const row = doc.data();
      const user = {
        name: row.name,
        email: row.email,
        lastSeen: row.lastSeen.toDate(),
      };
      return user;
    });
    handleListUser(users);
  });
  return unsubscribe;
};

export default { createUser, listUser };
