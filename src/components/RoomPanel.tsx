import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import app from "../firebase.config";
import FormDialog from "./FormDialog";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import utils from "../utils/date";
import { Link } from "react-router-dom";

interface Chatroom {
  name: string;
  createdTime: string;
}

const RoomPanel: React.FC = () => {
  const [chatroomName, setChatroomName] = useState("");
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);

  const [open, setOpen] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatroomName(event.target.value);
  };

  const handleSubmitChatRoomName = (name: string) => {
    console.log(name, "name test");
    setOpen(false);
    // todo add chatroom to firebase
  };

  const handleOnClickChatRoom = () => {
    // todo pass the name to ChatPanel
  };

  const listChatrooms = async () => {
    console.log("run listChatrooms");
    const db = getFirestore(app);
    const userCol = collection(db, "chatrooms");
    const snapshot = await getDocs(userCol);
    setChatrooms(
      snapshot.docs.map((doc) => {
        const date = doc.data().createdTime.toDate();
        const chatroom: Chatroom = {
          name: doc.data().name,
          createdTime: utils.formatDate(date),
        };
        console.log(chatroom);
        return chatroom;
      }),
    );
  };

  useEffect(() => {
    console.log("run listChatrooms");
    return () => {
      listChatrooms();
    };
  }, []);

  const createChatRoom = async () => {
    console.log(`createChatRoom run`);
    const db = getFirestore(app);
    const chatroomsCol = collection(db, "chatrooms");
    await addDoc(chatroomsCol, {
      name: chatroomName,
      createdTime: new Date(),
    });
  };

  return (
    <div>
      <div className="flex-1 p-4 overflow-y-auto basis-3/5 bg-blue-400">
        <div>
          {chatrooms.map((room: Chatroom, idx: number) => (
            <Link to={`chatroom/${room.name}`} key={idx}>
              <Button
                className={"m-3 w-30"}
                key={idx}
                onClick={() => handleOnClickChatRoom(room.name)}
              >
                {room.name}
              </Button>
            </Link>
          ))}
        </div>
        <Button className={"m-3 w-30"} onClick={() => setOpen(true)}>
          {"+"}
        </Button>
      </div>
      {open && (
        <FormDialog
          open={true}
          handleOpen={setOpen}
          handleSubmit={(name) => handleSubmitChatRoomName(name)}
        />
      )}
    </div>
  );
};

export default RoomPanel;
