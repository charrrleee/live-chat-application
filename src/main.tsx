import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RoomPanel from "./components/RoomPanel.tsx";
import ChatPanel from "./components/ChatPanel.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";

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
        path: "/chatroom/:chatroomName",
        element: <ChatPanel />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
