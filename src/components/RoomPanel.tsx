import { getFirestore, setDoc, doc, addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import app from "../firebase";
import utils from "../utils/date";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

interface Chatroom {
    name: string,
    createdTime: string,
}

const RoomPanel:React.FC = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [chatroomName, setChatroomName] = useState("");
    const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);

    const createChatRoom = async () => {
        console.log(`createChatRoom run`)
        const db = getFirestore(app);
        const chatroomsCol = collection(db, 'chatrooms')
        await addDoc(chatroomsCol, {
            name: chatroomName,
            createdTime: new Date(),
        })
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChatroomName(event.target.value);
    };


    const [username, setUsername] = useState<string>()
    const [email, setEmail] = useState<string>()

    const createUser = async () => {
        console.log(`createUser run`)
        const db = getFirestore(app);
        const userCol = collection(db, 'users')
        await addDoc(userCol, {
            name: username,
            email: email,
            lastSeen: new Date(),
        })
    }
    const login = () => {

        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.customData.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    
    
    }

    
    const listChatrooms = async () => {
        console.log("run listChatrooms")
        const db = getFirestore(app);
        const userCol = collection(db, 'chatrooms')
        const snapshot = await getDocs(userCol);
        setChatrooms(snapshot.docs.map(
            (doc) => { 
                const date = doc.data().createdTime.toDate()
                const chatroom: Chatroom = {
                    name: doc.data().name,
                    createdTime: utils.formatDate(date),
                };
                console.log(chatroom);
                return chatroom
            }))
    }

    
    useEffect(() => {
        console.log("run listChatrooms")
        return () => {listChatrooms()}
    }, [])

    return (
        <div className="h-full flex flex-col justify-between">
            <div className="flex justify-between items-center p-4 bg-blue-500 text-white basis-1/5">
                <span>Chat Room TBC</span>
                <input
                    type="text"
                    value={chatroomName}
                    onChange={handleChange}
                />                
                <button className="bg-white text-blue-500 px-2 py-1 rounded" onClick={() => createChatRoom()}>+ TBC</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto basis-3/5 bg-blue-400">
                {
                    chatrooms.map((room: Chatroom, idx) => (
                        <button key={idx}>{room.name}</button>
                    ))
                }
            </div>
            <div className="p-4">
                {
                    isLogin ? (<button className="bg-blue-500 text-white px-4 py-2 rounded basis-1/5">Logout TBC</button>) : (<button className="bg-blue-500 text-white px-4 py-2 rounded basis-1/5" onClick={login}>Login TBC</button>)
                }
            </div>
        </div>
    );
}

export default RoomPanel;
