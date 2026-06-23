import { useState, useContext } from "react";
import { LoginBoxContext, LoginContext, mailContext, NewUserContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";




export default function LoginAuth() {
    const [password, setPassword] = useState("")
    const { email, setEmail } = useContext(mailContext);
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const { showLogin, setShowLogin } = useContext(LoginBoxContext);
    const { isNewUser, SetIsNewUser } = useContext(NewUserContext);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);



    const navigate = useNavigate();


    return (
        <div className="bg-[#212121] max-w-screen min-h-screen h-auto flex flex-col items-center ">
            <header className="w-full p-5">
                <h1 className="text-white text-xl font-semibold">ChatGPT</h1>
            </header>
            <main className="flex flex-col justify-center items-center w-1/2">
                <div className="w-2/3 flex flex-col  items-center p-8">
                    <h2 className="text-3xl font-medium">Create Password</h2>
                    <p className="mt-3 text-center text-[#CDD5E0]">You’ll use this password to log in to ChatGPT and other OpenAI products</p>
                    <div className="mt-7 w-full flex flex-col gap-3">
                        <div className="relative w-full">
                            <input type="text" id="email" className="peer h-12 w-full rounded-full border border-[#454545] bg-[#212121] px-4 pr-12 text-white focus:border-[#7A8FD8] focus:outline-none" placeholder={email} />
                            <label
                                htmlFor="email"
                                className="absolute left-4 bg-[#212121] px-2 pointer-events-none 
                                
                                       
                                        text-[#aaa]
                                    
                                  top-0 -translate-y-1/2 text-sm "
                            >
                                email
                            </label></div>
                            <div className="relative w-full">
                            <input
                                id="code"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="peer h-12 w-full rounded-full border border-[#454545] bg-[#212121] px-4 pr-12 text-white focus:border-[#7A8FD8] focus:outline-none"
                            />

                            <label
                                htmlFor="code"
                                className={`absolute left-4 bg-[#212121] px-2 pointer-events-none transition-all duration-200   
                                    ${password
                                        ? "top-0 -translate-y-1/2 text-sm text-[#7A8FD8]"
                                        : "top-1/2 -translate-y-1/2 text-[#aaa]"
                                    }
                                    peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-[#7A8FD8]`}
                            >
                                Password
                            </label>

                            <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-white"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <div className="text-center w-full space-y-4">
                            <button type="button" className="mt-4 h-12 w-full rounded-full flex justify-center items-center bg-[#f7f7f7] px-4 text-black hover:bg-white transition-colors"
                            >
                                {isSendingOtp ? (
                                    <div className="h-5 w-5 animate-spin  rounded-full border-2 border-black border-t-transparent"></div>
                                ) : (
                                    "Continue"
                                )}
                            </button>
                            <button className="text-[#CDD5E0] ">Resend email</button>
                        </div>
                        {!isNewUser && <div className="my-5 flex items-center gap-4">
                            <div className="h-px flex-1 bg-[#555]" />
                            <span className="text-sm text-white font-semibold">OR</span>
                            <div className="h-px flex-1 bg-[#555]" />
                        </div>}
                        {!isNewUser && <button type="button" className="mt-4 h-12 w-full rounded-full text-[#CDD5E0] px-4 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            Continue with password
                        </button>}
                    </div>
                    <div className="mt-10 flex justify-center items-center gap-2">
                        <a href="#" className="underline text-sm text-[#CDD5E0]">Terms of use</a>
                        <div>|</div>
                        <a href="#" className="underline text-sm text-[#CDD5E0]">Privacy Policy</a>
                    </div>
                </div>
            </main>
        </div>
    )
}