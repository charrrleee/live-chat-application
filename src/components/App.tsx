import NavMenu from "./NavMenu";
import UserPanel from "./UserPanel";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="row vh-100 vw-100 rounded rounded-lg">
      <div className="col-2 bg-dark text-white">
        <NavMenu />
      </div>
      <div className="col-6 bg-light">
        <Outlet />
      </div>
      <div className="col-4 bg-dark text-white">
        <UserPanel />
      </div>
    </div>
  );
};

export default App;
