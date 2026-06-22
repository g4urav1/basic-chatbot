import { useState, useEffect, useContext } from "react";
import { Plus, Mic, AudioLines, ArrowUp } from "lucide-react";
import LogoutNav from "../components/logoutnav";
import LoginNav from "../components/loginnav";
import LoginSidebar from "../components/loginsidebar";
import LogoutSidebar from "../components/logoutsidebar";
import LoginPage from "../components/loginpage";
import { LoginBoxContext, LoginContext, MobileContext, SidebarContext } from "../context/context";



export default function Home() {
  
  const { showLogin} = useContext(LoginBoxContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { setIsMobile } = useContext(MobileContext);
  const { sidebarOpen} = useContext(SidebarContext);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const hasMessage = message.trim().length > 0;


  const handleSubmit = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage }
    ]);

    setMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:1111/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content }
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
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

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");

    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);


  return (

            <div className="flex h-screen bg-black text-white font-sans scrollbar-dark overflow-hidden">

              {showLogin && <LoginPage />}

              {isLoggedIn ? <LoginSidebar /> : <LogoutSidebar />}

              <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#000000]">



                {isLoggedIn ? <LoginNav /> : <LogoutNav />}


                <div className="flex-1 overflow-y-auto px-4 py-6">
                  {messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                      <h1 className="text-2xl md:text-3xl font-semibold text-center">
                        Where should we begin?
                      </h1>
                    </div>
                  ) : (
                    <div className="max-w-3xl mx-auto flex flex-col gap-4">
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`p-3 px-4 rounded-full max-w-[80%] ${msg.role === "user"
                            ? "bg-[#303030] self-end"
                            : "bg-transparent self-start"
                            }`}
                        >
                          {msg.content}
                        </div>
                      ))}

                      {isTyping && (
                        <div className="self-start px-4 py-3 rounded-2xl animate-pulse"
                          style={{ animationDelay: "400ms" }} >
                            Thinking...
                        </div>
                      )}
                    </div>
                  )}
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
          
  );
}