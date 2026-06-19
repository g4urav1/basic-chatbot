import React, { useContext, useState } from "react";
import { ChevronDown, Sparkle, Sparkles, LucideAtom, Check, MessageCircleDashed } from "lucide-react";
import hamburger from "../assets/hamburgermenu.svg";
import { LoginBoxContext, SidebarContext } from "../context/context";

export default function LogoutNav() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { showLogin, setShowLogin } = useContext(LoginBoxContext);
    const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext)

    return (
        <>
            <nav className="flex items-center justify-between p-3  md:px-3 md:py-2 bg-[#000000] text-white">
                <div className="flex items-center gap-3">
                    <button
                        className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <img src={hamburger} alt="" />

                    </button>
                    {dropdownOpen && <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>}
                    <div onClick={() => setDropdownOpen(!dropdownOpen)} className=" relative text-lg flex gap-2 items-center font-semibold p-2 rounded-md hover:bg-[#303030] transition-colors select-none"><span>ChatGPT</span><ChevronDown size={"20px"} color="#AFAFAF" />

                    </div>
                    {dropdownOpen && (


                        <div className="flex absolute top-16 items-start justify-start font-sans z-[20]">
                            <div className="w-fit rounded-[24px] bg-[#333333] px-4 py-2 text-white">

                                <div className="flex items-start">
                                    <div className="mt-[10px] flex w-[30px] justify-start text-white">
                                        <Sparkles size={18} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[14px] font-semibold tracking-[-0.3px]">
                                            ChatGPT Plus
                                        </p>
                                        <p className="mt-[1px] text-[10px] tracking-tighter  text-[#b9b9b9]">
                                            Our smartest model & more
                                        </p>
                                    </div>
                                    <button className="mt-2 ml-4 rounded-full border border-[#464646] bg-[#252525] px-4 py-1 text-[14px] font-semibold text-white">
                                        Upgrade
                                    </button>
                                </div>

                                <div className="mt-[10px] flex items-start">
                                    <div className="mt-[7px] flex w-[30px] justify-start text-white">
                                        <LucideAtom size={18} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[14px] font-semibold leading-[24px] tracking-[-0.3px]">
                                            ChatGPT
                                        </p>
                                        <p className="mt-[1px] text-[10px] tracking-tighter text-[#b9b9b9]">
                                            Great for everyday tasks
                                        </p>
                                    </div>
                                    <div className="mt-[12px] text-white">
                                        <Check size={18} strokeWidth={2.2} />
                                    </div>
                                </div>
                            </div>
                        </div>


                    )}
                    <div className="hidden md:block text-xl font-semibold opacity-0">Empty space</div>
                </div>

                <div className="flex items-center gap-2 md:gap-5">
                    <div className="text-[#DCDBF6] flex items-center gap-1">
                        <Sparkle size={20} fill="#DCDBF6" />
                        <span className="text-sm">Upgrade to Go</span>
                    </div>
                    <div>

                        <MessageCircleDashed size={18} /></div>
                </div>
            </nav>
        </>
    )
}