import { createContext } from "react";


export  const SidebarContext = createContext({
sidebarOpen: true,
setSidebarOpen: () => {}
});
export  const MobileContext = createContext({
isMobile: false,
setIsMobile: () => {}
});
export  const LoginBoxContext = createContext({
showLogin: false,
setShowLogin: () => {}
});
export  const LoginContext = createContext({
showLogin: false,
setShowLogin: () => {}
});

