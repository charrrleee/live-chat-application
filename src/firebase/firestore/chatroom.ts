import {
  Timestamp,
  Unsubscribe,
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import app from "./firebase.config";

const createChatroom = async (name: string) => {
  console.log(`createChatRoom run`);
  const db = getFirestore(app);
  const now = Date.now();
  const target = collection(db, "chatrooms");
  const timestamp = Timestamp.fromMillis(now);
  await addDoc(target, {
    name: name,
    createdTime: timestamp,
  });
};

const listChatroom = (
  handleResult: (docs: Chatroom[]) => void,
): Unsubscribe => {
  const db = getFirestore(app);
  // todo snapshot // subscribtion
  const unsubscribe = onSnapshot(collection(db, "chatrooms"), (snapshot) => {
    const chatrooms = snapshot.docs.map((doc) => {
      const row = doc.data();
      return {
        id: doc.id,
        name: row.name,
        createdTime: row.createdTime.toDate(),
      };
    });

    handleResult(chatrooms);
  });
  return unsubscribe;
};

export default { createChatroom, listChatroom };
