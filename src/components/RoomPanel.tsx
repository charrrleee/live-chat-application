import FormDialog from "./FormDialog";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import utils from "../utils/date";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import fsChatRoom from "../firebase/firestore/chatroom";

const RoomPanel: React.FC = () => {
  const [chatroomName, setChatroomName] = useState("");
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  const handleOnChangeChatRoom = (name: string) => {
    setChatroomName(name);
  };

  const handleOnClickChatRoom = () => {
    localStorage.setItem("room", chatroomName);
  };

  const handleSubmitChatRoomName = async (name: string) => {
    console.log(name, "name test");
    await fsChatRoom.createChatroom(chatroomName);
    setOpen(false);
  };

  const handleListChatroom = (chatrooms: Chatroom[]) => {
    setChatrooms(chatrooms);
  };

  useEffect(() => {
    const unsubscribe = fsChatRoom.listChatroom(handleListChatroom);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="p-4">
        <div>
          {chatrooms.map((room: Chatroom, idx: number) => (
            <Link to={`chatroom/${room.id}`} key={idx}>
              <Button
                className={"m-3 w-30 btn-dark"}
                key={idx}
                onClick={handleOnClickChatRoom}
              >
                <div>{room.name}</div>
                <div>{utils.formatDate(room.createdTime)}</div>
              </Button>
            </Link>
          ))}
        </div>
        {user.email !== "" && (
          <Button className={"m-3 w-30"} onClick={() => setOpen(true)}>
            {"+"}
          </Button>
        )}
      </div>
      {open && (
        <FormDialog
          open={true}
          handleOpen={setOpen}
          handleChange={(name) => handleOnChangeChatRoom(name)}
          handleSubmit={(name) => handleSubmitChatRoomName(name)}
        />
      )}
    </div>
  );
};

export default RoomPanel;
