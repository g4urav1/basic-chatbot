import { ChevronRight, Sparkle, CircleGauge, CircleUserRound, LogOut, Settings, LifeBuoy } from "lucide-react";
import { LoginContext, MessagesContext } from "../context/context";
import { useContext } from "react";

export default function AccDropdown() {
    
    
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const { messages, setMessages } = useContext(MessagesContext);

    return (
        <div className="fixed bottom-14 left-2 p-4 mt-2 w-full bg-[#353535] border border-white/10 rounded-lg shadow-lg z-50">
            <div className="p-2  flex justify-between w-full gap-2  items-center text-sm">
                <div className="flex gap-2 items-center">
                    <div className="rounded-full bg-orange-500 w-6 h-6"></div>
                    <div>
                        <div>Name</div>
                        <div className="text-xs text-gray-300">Plan</div>
                    </div>
                </div>
                <div>
                    <ChevronRight size={18} />
                </div>
            </div>


            <div className="px-2 py-2 border-t-[1px] border-white/10">

                <ul className="text-sm flex flex-col gap-2">
                    <li className=" py-1 flex items-center gap-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
                        <Sparkle size={18} className="shrink-0" />
                        <span className={`whitespace-nowrap transition-opacity duration-200`}>
                            Upgrade plan
                        </span>
                    </li>
                    <li className=" py-1 flex items-center gap-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
                        <CircleGauge size={18} className="shrink-0" />
                        <span className={`whitespace-nowrap transition-opacity duration-200`}>
                            Personalization
                        </span>
                    </li>
                    <li className=" py-1 flex items-center gap-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
                        <CircleUserRound size={18} className="shrink-0" />
                        <span className={`whitespace-nowrap transition-opacity duration-200`}>
                            Profile
                        </span>
                    </li>
                    <li className=" py-1 flex items-center gap-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
                        <Settings size={18} className="shrink-0" />
                        <span className={`whitespace-nowrap transition-opacity duration-200`}>
                            Settings
                        </span>
                    </li>
                </ul>
            </div>
            <div className="px-2 py-2 border-t-[1px] border-white/10">

                <ul className="text-sm flex flex-col gap-2">
                    <li className=" py-1 flex items-center justify-between hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
                    <div className="flex gap-2">
                        <LifeBuoy size={18} className="shrink-0" />
                        <span className={`whitespace-nowrap transition-opacity duration-200`}>
                            Help
                        </span></div>
                        <span><ChevronRight size={14}/></span>
                    </li>
                    <li onClick={() => {
                        localStorage.removeItem("isLoggedIn");
                        setIsLoggedIn(false);
                        setMessages([])
                    }} className=" py-1 flex items-center gap-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors overflow-hidden">
                        <LogOut size={18} className="shrink-0" />
                        <span className={`whitespace-nowrap transition-opacity duration-200`}>
                            LogOut
                        </span>
                    </li>
                 </ul>
            </div>
        </div>
    );
}