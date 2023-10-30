import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import User from "../types/User";
import app from "./firestore/firebase.config";

const login = async (): Promise<User> => {
  // configuration
  app;
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  auth.languageCode = "it";

  return await signInWithPopup(auth, provider)
    .then((result) => {
      const u = result.user;
      let email = "";
      let name = "";

      if (u.email !== null && u.displayName !== null) {
        email = u.email;
        name = u.displayName;
      }

      const user: User = {
        email: email,
        name: name,
        lastSeen: new Date,
      };
      return user;
      // dispatch(reduxLogin({email: user.email, name: user.displayName}))
      // console.log("login, success", userRedux.email)
      // setIsLogin(true)
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      const user: User = {
        email: "",
        name: "",
        lastSeen: new Date,
      };
      return user;
    });
};

const logout = async (): Promise<boolean> => {
  const auth = getAuth();
  return signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error: Error) => {
      console.log(`authentication - logout: ${error}`);
      return false;
    });
};

export default { login, logout };
