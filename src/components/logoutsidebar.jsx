import React, { useState, useEffect, useContext } from "react";
import { PanelLeft, SquarePen, Search, Image as ImageIcon, Star, Settings, X, LifeBuoy } from "lucide-react";
import star from "../assets/star.svg";
import help from "../assets/help.svg";
import sidebaricon from "../assets/sidebar.svg";
import { MobileContext, SidebarContext } from "../context/context"
import { LoginBoxContext } from "../context/context"

export default function LogoutSidebar() {

  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext)
  const { showLogin, setShowLogin } = useContext(LoginBoxContext);


  const { isMobile, setIsMobile } = useContext(MobileContext);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>

      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:relative z-50 flex flex-col h-screen bg-black border-r border-white/10 transition-all ease-in-out duration-300 shrink-0
          ${sidebarOpen ? "translate-x-0 w-[280px] md:w-[260px]" : "-translate-x-full md:translate-x-0 md:w-[68px]"}
        `}
      >

        <div className="p-3 md:px-[14px] md:py-[10px] flex justify-between items-center h-[60px]">
          <div className={`flex items-center gap-3 overflow-hidden ${!sidebarOpen && 'md:hidden'}`}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg"
              alt="ChatGPT Logo"
              className="w-5 brightness-0 invert"
            />
          </div>

          <button
            className="p-2  hover:bg-white/10 rounded-lg transition-colors cursor-e-resize shrink-0"
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            {isMobile ? sidebarOpen && <X size={20} /> : <img src={sidebaricon} alt="Sidebar" />}
          </button>
        </div>

        <div className="pt-2 px-2">
          <ul className="text-sm flex flex-col gap-1">
            <li className="px-3 py-2 flex items-center gap-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
              <SquarePen size={18} className="shrink-0" />
              <span className={`whitespace-nowrap transition-opacity duration-200 ${!sidebarOpen && 'md:opacity-0 md:w-0'}`}>
                New Chat
              </span>
            </li>
            <li className="px-3 py-2 flex items-center gap-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
              <Search size={18} className="shrink-0" />
              <span className={`whitespace-nowrap transition-opacity duration-200 ${!sidebarOpen && 'md:opacity-0 md:w-0'}`}>
                Search Chat
              </span>
            </li>
            <li className="px-3 py-2 flex items-center gap-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
              <ImageIcon size={18} className="shrink-0" />
              <span className={`whitespace-nowrap transition-opacity duration-200 ${!sidebarOpen && 'md:opacity-0 md:w-0'}`}>
                Images
              </span>
            </li>
          </ul>
        </div>

        <div className="flex-1 overflow-auto"></div>

        <div className="px-2 pt-2 border-b border-white/10 pb-2">
          <ul className="text-sm flex flex-col gap-1">
            <li className={`px-3 py-2 flex items-center gap-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden ${!sidebarOpen && 'md:opacity-0 md:w-0'}`}>
              <img src={star} width={"20px"} alt="" />
              <span className={`whitespace-nowrap transition-opacity duration-200 ${!sidebarOpen && 'md:opacity-0 md:w-0'}`}>
                See plans and pricing
              </span>
            </li>
            <li className={`px-3 py-2 flex items-center gap-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden ${!sidebarOpen && 'md:opacity-0 md:w-0'}`}>
              <Settings size={20} className="shrink-0" />
              <span className={`whitespace-nowrap transition-opacity duration-200 ${!sidebarOpen && 'md:opacity-0 md:w-0'}`}>
                Settings
              </span>
            </li>
            <li className={`px-3 py-2 flex items-center gap-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden ${!sidebarOpen && 'md:opacity-0 md:w-0'}`}>

              <LifeBuoy size={20} strokeWidth={1.5} />
              <span className={`whitespace-nowrap transition-opacity duration-200 ${!sidebarOpen && 'md:opacity-0 md:w-0'}`}>
                Help
              </span>
            </li>
          </ul>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ${!sidebarOpen ? 'md:h-0 md:opacity-0' : 'h-auto opacity-100'}`}>
          <footer className="p-6 border-t-[1px] border-white/20 flex flex-col gap-2 justify-center items-start text-sm">
            <div className="font-semibold whitespace-nowrap">Get responses tailored to you</div>
            <div className="text-[#AEAEAE] text-xs leading-relaxed">
              Log in to get answers based on saved chats, plus create images and upload files.
            </div>
            <button   onClick={() => {
    setShowLogin(!showLogin);
    setSidebarOpen(false);
  }}
             className="w-full bg-[#212121] text-white mt-2 py-2.5 rounded-full text-sm font-semibold transition-colors border border-white/20 ">
              Log in
            </button>
          </footer>
        </div>
      </aside>
    </>
  )
};