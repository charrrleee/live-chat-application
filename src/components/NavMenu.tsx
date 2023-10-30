import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import auth from "../firebase/authentication";
import fsUser from "../firebase/firestore/user";
import User from "../types/User";
import { login, logout } from "../redux/slice/userSlice";
import { RootState } from "../redux/store";

const NavMenu: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isLogin, setIsLogin] = useState(user.name !== "");
  const dispatch = useDispatch();

  const loginToGoogle = async () => {
    const user: User = await auth.login();
    if (user == null) {
      console.log("error");
      return;
    }
    dispatch(
      login({ email: user.email, name: user.name, lastSeen: user.lastSeen }),
    );
    setIsLogin(true);
    await fsUser.createUser(user);
  };

  const logoutFromGoogle = async () => {
    const success = await auth.logout();
    if (success) {
      dispatch(logout({}));
      setIsLogin(false);
    }
  };

  return (
    <div className="d-flex flex-column col justify-content-between align-items-center align-self-center">
      <Link to={"/"} className="text-dark">
        Chat Room
      </Link>
      <div className="p-4">
        {isLogin ? (
          <Button className="" onClick={logoutFromGoogle}>
            Logout
          </Button>
        ) : (
          <Button className="" onClick={loginToGoogle}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavMenu;
