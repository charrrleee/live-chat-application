import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
// import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RoomPanel from "./components/RoomPanel.tsx";
import ChatPanel from "./components/MsgPanel.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { store } from "./redux/store.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <RoomPanel />,
      },
      {
        path: "/chatroom/:chatroomId",
        element: <ChatPanel />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
