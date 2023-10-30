import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import fsMessages from "../firebase/firestore/message";
import MsgCard from "./MsgCard";

const ChatPanel: React.FC = () => {
  const location = useLocation();
  const roomId = location.pathname.split("/")[2];
  const user = useSelector((state: RootState) => state.user);
  const [roomName, setRoomName] = useState("");
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [msg, setMsg] = useState<Message>({
    username: "",
    email: "",
    text: "",
    createdTime: new Date(),
  });

  const handleTextOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = e.target.value;
    const newMsg = {
      username: user.name,
      email: user.email,
      text: m,
      createdTime: new Date(),
    };
    setMsg(newMsg);
  };

  const handleTextOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("Form submitted with data:");
    e.preventDefault();
    fsMessages.createMessage(roomId, msg);
    setMsg({ ...msg, text: "" });
  };

  const handleListMessage = (msgs: Message[]) => {
    setMsgs(msgs);
  };

  useEffect(() => {
    const roomName = localStorage.getItem("room");
    if (roomName === null) {
      throw "";
    }

    const unsubscribe = fsMessages.listMessages(roomId, handleListMessage);
    setRoomName(roomName);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="d-flex h-100 flex-column justify-content-between">
      <div>
        <div className="row-10">
          <span>{roomName}</span>
        </div>
        <div className="row-0">
          {msgs.map((msg, idx) => (
            <MsgCard key={idx} msg={msg} />
          ))}
        </div>
      </div>
      {user.email !== "" && (
        <Form className="form-group row" onSubmit={handleTextOnSubmit}>
          <input
            type="text"
            className="form-control col-1"
            placeholder="Type ur msg here"
            onChange={(e) => handleTextOnChange(e)}
            value={msg!.text}
          />
          <Button type="submit" className="btn-primary mb-2 col-2">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default ChatPanel;
