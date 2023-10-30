import {
  Unsubscribe,
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import app from "./firebase.config";

const createMessage = async (name: string, msg: Message) => {
  const db = getFirestore(app);
  const col = collection(db, "chatrooms", name, "message");
  await addDoc(col, msg);
};

// real time
const listMessages = (
  name: string,
  handleListMessage: (msgs: Message[]) => void,
): Unsubscribe => {
  
  const db = getFirestore(app);
  const col = collection(db, "chatrooms", name, "message");
  const q = query(col, orderBy("createdTime"));

  // todo snapshot // subscribtion
  const unsubscribe: Unsubscribe = onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => {
      const row = doc.data();
      const msg: Message = {
        username: row.username,
        email: row.email,
        text: row.text,
        createdTime: row.createdTime.toDate(),
      };
      return msg;
    });
    handleListMessage(msgs);
    return unsubscribe;
  });
};

export default { listMessages, createMessage };
