import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import hamburger from "../assets/hamburgermenu.svg";

export default function LogoutNav() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <>
            <nav className="flex items-center justify-between p-3 md:px-6 md:py-4 bg-[#000000] text-white">
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
                        <div className="absolute rounded-xl top-16 w-[320px] left-68 bg-[#353535] border border-white/10 shadow-lg z-[20]">
                            <div className="h-32 overflow-hidden">
                                <img className="w-full rounded-xl" src="https://chatgpt.com/cdn/assets/no-auth-upsell-m8ypcpwf.webp" alt="" /></div>
                            <div className="p-4">
                                <p>Try advance features for free</p>
                                <p className="text-xs mb-5 text-[#AEAEAE]">Get smarter responses, upload files, create images, and more by logging in. </p>
                                <div className="flex items-center gap-2 md:gap-3">
                                    <button onClick={() => setShowLogin(!showLogin)} className="px-4 py-1.5 rounded-full bg-white hover:bg-gray-200 text-black text-sm font-medium transition-colors">
                                        Log in
                                    </button>
                                    <button onClick={() => setShowLogin(!showLogin)} className="hidden sm:block px-4 py-1.5 rounded-full bg-[#303030] hover:bg-[#404040] text-white   text-sm font-medium transition-colors">
                                        Sign up for free
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="hidden md:block text-xl font-semibold opacity-0">Empty space</div>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    <button onClick={() => setShowLogin(!showLogin)} className="px-4 py-1.5 rounded-full bg-white hover:bg-gray-200 text-black text-sm font-medium transition-colors">
                        Log in
                    </button>
                    <button onClick={() => setShowLogin(!showLogin)} className="hidden sm:block px-4 py-1.5 rounded-full bg-[#303030] hover:bg-[#404040] text-white   text-sm font-medium transition-colors">
                        Sign up for free
                    </button>
                </div>
            </nav>
        </>
    )
}