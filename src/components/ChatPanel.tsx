import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import app from "../firebase.config";
import { Button, Form } from "react-bootstrap";
import { FormEvent } from "react";
import { FormEventHandler } from "react";
import utils from "../utils/date";
import { useLocation } from "react-router-dom";

// interface ChatPanelProps {
//     name: string
// }

interface Msg {
  name: string;
  text: string;
}

const ChatPanel: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [msgs, setMsgs] = useState<Msg[]>([
    { name: "User1", text: "123" },
    { name: "User2", text: "123" },
  ]);

  const [msg, setMsg] = useState<Msg>({ name: "", text: "" });

  const handleTextOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = e.target.value;
    const newMsg = {
      name: "test TBD",
      text: m,
    };
    setMsg(newMsg);
  };

  const handleTextOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("Form submitted with data:");
    e.preventDefault();

    setMsgs([...msgs, msg]);
    setMsg({ name: "", text: "" });
  };

  return (
    <div className="d-flex h-100 flex-column justify-content-between">
      <div>
        <div className="row-10">
          <span>{currentPath}</span>
        </div>
        <div className="row-0">
          {msgs.map((msg, idx) => (
            <div key={idx}>
              <span>{msg.name}</span>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
      </div>
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
    </div>
  );
};

export default ChatPanel;
