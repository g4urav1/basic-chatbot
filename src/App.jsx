import React, { useState, useEffect, useContext } from "react";

import Home from "./Pages/home";
import LoginAuth from "./Pages/loginauth";
import Parent from "./Pages/parent";
import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NewUserContext, SidebarContext } from "./context/context"
import { LoginBoxContext } from "./context/context"
import { MobileContext } from "./context/context"
import { LoginContext } from "./context/context"
import { MessagesContext } from "./context/context"
import { mailContext } from "./context/context"
import SetupAcc from "./Pages/setupAcc";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Parent />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <LoginAuth /> },
      { path: "acc_setup", element: <SetupAcc/> }
    ]
  }
]);

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [messages, setMessages] = useState([]);
  const [email, setEmail] = useState("");
  const [isNewUser, setIsNewUser] = useState(true);
  return (
    <NewUserContext.Provider value={{ isNewUser, setIsNewUser }}>
      <mailContext.Provider value={{ email, setEmail }}>
        <MessagesContext.Provider value={{ messages, setMessages }}>
          <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <MobileContext.Provider value={{ isMobile, setIsMobile }}>
              <LoginBoxContext.Provider value={{ showLogin, setShowLogin }}>
                <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
                  <RouterProvider router={router} />
                </SidebarContext.Provider>
              </LoginBoxContext.Provider>
            </MobileContext.Provider>
          </LoginContext.Provider>
        </MessagesContext.Provider>
      </mailContext.Provider>
    </NewUserContext.Provider>
  );
}