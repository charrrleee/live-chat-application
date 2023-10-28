import NavMenu from "./NavMenu";
import UserPanel from "./UserPanel";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="flex row m-auto h-100 w-100">
      <div className="col-2 bg-primary">
        <NavMenu />
      </div>
      <div className="col-8 bg-secondary">
        <Outlet />
      </div>
      <div className="col-2 bg-success">
        <UserPanel />
      </div>
    </div>
  );
};

export default App;
