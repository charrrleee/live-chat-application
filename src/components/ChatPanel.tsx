import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import app from "../firebase";


interface ChatPanelProps {
    name: string
}

interface Msg {
    name: string
    text: string
}

const ChatPanel: React.FC<ChatPanelProps> = (props: ChatPanelProps) => {
    const [msgs, setMsgs] = useState<Msg[]>([
        {name: "123", text: "123"}, 
        {name: "123", text: "123"}
    ]);


    
    return (
        <div className="flex flex-col">
            <div className="basis-1/5">
                <span>{props.name}</span>
            </div>
            <div className="basis-3/5">
                {
                    msgs.map((msg, idx)=> (
                        <div key={idx}>
                            <span>{msg.name}</span>
                            <span>{msg.text}</span>
                        </div>
                    ))
                }
            </div>
            <div className="basis-1/5">
                {/* handled with enter */}
                <input></input>
                <button>Enter</button>
            </div>
        </div>
    );
}

export default ChatPanel;