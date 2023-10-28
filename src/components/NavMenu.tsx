import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import app from "../firebase.config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button } from "react-bootstrap";

const NavMenu: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();

  const createUser = async () => {
    console.log(`createUser run`);
    const db = getFirestore(app);
    const userCol = collection(db, "users");
    await addDoc(userCol, {
      name: username,
      email: email,
      lastSeen: new Date(),
    });
  };
  const login = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex justify-between items-center p-4 bg-blue-500 text-white basis-1/5">
        <span>Chat Room TBC</span>
      </div>
      <div className="p-4">
        {isLogin ? (
          <button className="bg-blue-500 text-white px-4 py-2 rounded basis-1/5">
            Logout TBC
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded basis-1/5"
            onClick={login}
          >
            Login TBC
          </button>
        )}
      </div>
    </div>
  );
};

export default NavMenu;
