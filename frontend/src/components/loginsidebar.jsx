import { useState, useEffect, useContext } from "react";
import { SquarePen, Search, X } from "lucide-react";

import sidebaricon from "../assets/sidebar.svg";
import library from "../assets/library.svg";
import folder from "../assets/folder.svg";
import app from "../assets/app.svg";
import codex from "../assets/codex.svg";

import { MobileContext, SidebarContext, userNameContext } from "../context/context";
import AccDropdown from "./accdropdown";

export default function LoginSidebar() {
    const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);
    const { isMobile, setIsMobile } = useContext(MobileContext);
    const { userName } = useContext(userNameContext);

    const [isHovered, setIsHovered] = useState(false);
    const [showAccDropdown, setShowAccDropdown] = useState(false);

    const chatgptLogo =
        "https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg";

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, [setIsMobile]);

    const displayName= localStorage.getItem("username")

    return (
        <>
            {sidebarOpen && isMobile && (
                <div
                    className="fixed inset-0 z-30 md:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed md:relative z-[50] flex flex-col h-screen bg-black border-r border-white/10 transition-all ease-in-out duration-300 shrink-0
          ${sidebarOpen
                        ? "translate-x-0 w-[280px] md:w-[260px]"
                        : "-translate-x-full md:translate-x-0 md:w-[68px]"
                    }
        `}
            >
                <div className={`p-2 ${sidebarOpen && "md:px-[15px]"} md:py-[10px] flex justify-between h-[60px] ${!sidebarOpen && "md:pl-7px md:pr-[14px]"}`}>
                    <div className="flex items-center gap-2 overflow-hidden">
                        {sidebarOpen && (
                            <img
                                src={chatgptLogo}
                                alt="ChatGPT Logo"
                                className="w-5 brightness-0 invert"
                            />
                        )}

                        {!sidebarOpen && (
                            <button
                                type="button"
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={() => {
                                    setSidebarOpen(true);
                                    setIsHovered(false);
                                }}
                            >
                                <img
                                    src={isHovered ? sidebaricon : chatgptLogo}
                                    alt="ChatGPT Logo"
                                    className={
                                        isHovered
                                            ? "w-5 h-5"
                                            : "w-5 h-5 brightness-0 invert"
                                    }
                                />
                            </button>
                        )}
                    </div>

                    <button
                        className={`p-2 hover:bg-white/10 rounded-lg transition-colors cursor-e-resize shrink-0 ${!sidebarOpen && "md:hidden"
                            }`}
                        onClick={() => {
                            setSidebarOpen(!sidebarOpen);
                            setIsHovered(false);
                        }}
                    >
                        {isMobile ? (
                            sidebarOpen && <X size={20} />
                        ) : (
                            <img
                                src={sidebaricon}
                                alt="Sidebar"
                                className="w-5 h-5" />
                        )}
                    </button>
                </div>

                <div className="pt-2 pr-2 pl-[7px]">
                    <ul className="text-sm flex flex-col gap-1">
                        <li className="px-2 py-2 flex items-center gap-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
                            <SquarePen size={18} className="shrink-0" />
                            <span
                                className={`whitespace-nowrap transition-opacity duration-200 ${!sidebarOpen && "md:opacity-0 md:w-0"
                                    }`}
                            >
                                New Chat
                            </span>
                        </li>

                        <li className="px-2 py-2 flex items-center gap-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
                            <Search size={18} className="shrink-0" />
                            <span
                                className={`whitespace-nowrap transition-opacity duration-200 ${!sidebarOpen && "md:opacity-0 md:w-0"
                                    }`}
                            >
                                Search Chat
                            </span>
                        </li>

                        {sidebarOpen && <> <li className="px-2 py-2 flex items-center gap-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
                            <img src={library} alt="" />
                            <span
                                className={`whitespace-nowrap transition-opacity duration-200 ${!sidebarOpen && "md:opacity-0 md:w-0"
                                    }`}
                            >
                                Library
                            </span>
                        </li>

                            <li className="px-2 py-2 flex items-center gap-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
                                <img src={folder} alt="" />
                                <span
                                    className={`whitespace-nowrap transition-opacity duration-200 ${!sidebarOpen && "md:opacity-0 md:w-0"
                                        }`}
                                >
                                    Projects
                                </span>
                            </li>

                            <li className="px-2 py-2 flex items-center gap-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
                                <img src={app} alt="" />
                                <span
                                    className={`whitespace-nowrap transition-opacity duration-200 ${!sidebarOpen && "md:opacity-0 md:w-0"
                                        }`}
                                >
                                    App
                                </span>
                            </li>

                            <li className="px-2 py-2 flex items-center gap-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
                                <img src={codex} alt="" />
                                <span
                                    className={`whitespace-nowrap transition-opacity duration-200 ${!sidebarOpen && "md:opacity-0 md:w-0"
                                        }`}
                                >
                                    Codex
                                </span>
                            </li></>}
                    </ul>
                </div>

                <div className="flex-1 overflow-auto"></div>

                <div
                    className={`overflow-hidden transition-all duration-300 ${!sidebarOpen ? "md:h-0 md:opacity-0" : "h-auto opacity-100"
                        }`}
                >
                    {showAccDropdown && <AccDropdown />}

                    <footer
                        onClick={() => setShowAccDropdown(!showAccDropdown)}
                        className="p-2 border-t-[1px] border-white/20 flex justify-between w-full gap-2 items-start text-sm"
                    >
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full bg-orange-500 w-6 h-6"></div>
                            <div>
                                <div>{displayName}</div>
                                <div className="text-xs text-gray-300">Plan</div>
                            </div>
                        </div>

                        <button className="border-[1px] border-white/40 px-2 py-1 rounded-full">
                            Upgrade
                        </button>
                    </footer>
                </div>
            </aside>
        </>
    );
}