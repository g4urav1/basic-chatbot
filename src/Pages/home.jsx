import React, { useState, useEffect } from "react";
import { PanelLeft, SquarePen, Search, Image as ImageIcon, Star, Settings, Plus, Mic, AudioLines, Menu, ArrowUp } from "lucide-react";
import star from "../assets/star.svg";
import help from "../assets/help.svg";
import sidebar from "../assets/sidebar.svg";
import hamburger from "../assets/hamburgermenu.svg";
import LogoutNav from "../components/logoutnav";
import LoginNav from "../components/loginnav";
import LoginSidebar from "../components/loginsidebar";
import LogoutSidebar from "../components/logoutsidebar";
import LoginPage from "../components/loginpage";

import {SidebarContext} from "../context/context"
import {LoginBoxContext} from "../context/context"
import {MobileContext} from "../context/context"
import {LoginContext} from "../context/context"




export default function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  const hasMessage = message.trim().length > 0;
  const handleSubmit = () => {
    if (!hasMessage) return;
    console.log("Send message:", message);
    setMessage("");
  };
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  return (
    
    <LoginContext.Provider  value={{ isLoggedIn, setIsLoggedIn }}>
    <MobileContext.Provider value = {{isMobile , setIsMobile}}>
    <LoginBoxContext.Provider value = {{showLogin , setShowLogin}}>
    <SidebarContext.Provider value = {{sidebarOpen , setSidebarOpen}}>
      <div className="flex h-screen bg-black text-white font-sans overflow-hidden">

        {showLogin && <LoginPage />}

    {isLoggedIn?<LoginSidebar/>:<LogoutSidebar />}    

        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#000000]">


      
         {isLoggedIn?<LoginNav/>:<LogoutNav />} 


          <div className="flex-1 flex flex-col items-center justify-center py-4 pl-4">
            <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Where should we begin?</h1>
          </div>
          <div className="w-full pb-4 md:pb-6 px-4">
            <div className="w-full sm:w-[90%] md:max-w-3xl mx-auto flex items-center gap-2 md:gap-3 bg-[#303030] border border-white/10 rounded-full py-2 px-4 shadow-lg focus-within:bg-[#383838] transition-colors">
              <button className="text-[#AEAEAE] hover:text-white p-1 rounded-full transition-colors shrink-0">
                <Plus size={22} />
              </button>
              <input type="text" placeholder="Message ChatGPT..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                className="bg-transparent text-white placeholder:text-[#AEAEAE] py-2 flex-1 min-w-0 focus:outline-none text-sm md:text-base"
              />
              <div className="flex justify-center items-center gap-1 md:gap-2 shrink-0">
                <button className="text-[#AEAEAE] rounded-full hover:bg-[#424242] hover:text-white p-2 transition-colors">
                  <Mic size={20} />
                </button>
                <button
                  onClick={hasMessage ? handleSubmit : undefined}
                  className={`flex items-center justify-center gap-2 rounded-full px-3 py-2 transition-colors text-white ${hasMessage ? "bg-white text-black hover:bg-[#e5e5e5]" : "bg-[#424242] hover:bg-[#3a3a3a]"
                    }`}
                >
                  {hasMessage ? (
                    <>
                      <ArrowUp size={18} />
                    </>
                  ) : (
                    <>
                      <AudioLines size={18} />
                      <span className="hidden sm:inline text-sm font-medium">Voice</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="mt-3 md:mt-4 text-xs text-[#AEAEAE] w-full max-w-2xl mx-auto text-center px-2">
              ChatGPT is AI. By using it, you agree to our <a href="#" className="underline hover:text-white">Terms</a> & <a href="#" className="underline hover:text-white">Privacy Policy</a>. Chats may be reviewed and used to improve our AI models. <a href="#" className="underline hover:text-white">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
    </LoginBoxContext.Provider>
    </MobileContext.Provider>
    </LoginContext.Provider>
  );
}