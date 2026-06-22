import { createContext } from "react";


export const SidebarContext = createContext({
    sidebarOpen: true,
    setSidebarOpen: () => { }
});
export const MobileContext = createContext({
    isMobile: false,
    setIsMobile: () => { }
});
export const LoginBoxContext = createContext({
    showLogin: false,
    setShowLogin: () => { }
});
export const NewUserContext = createContext({
    isNewUser: true,
    setIsNewUser: () => { }
});
export const LoginContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => { }
});
export const MessagesContext = createContext({
    messages: [],
    setMessages: []
});
export const mailContext = createContext({
    email: "",
    setEmail: () => { }
});





