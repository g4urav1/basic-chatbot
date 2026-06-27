import { useState, useContext } from "react";
import { LoginBoxContext, LoginContext, mailContext, NewUserContext, userNameContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";




export default function SetupAcc() {
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const { userName, setUserName } = useContext(userNameContext);
    const { email, setEmail } = useContext(mailContext);
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const { showLogin, setShowLogin } = useContext(LoginBoxContext);
    const { isNewUser, SetIsNewUser } = useContext(NewUserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [infoPage, setInfoPage] = useState(false);



    const navigate = useNavigate();

    const handlePasswordCreation = async () => {
        try {

            setIsLoading(true);

            const response = await fetch("http://localhost:1111/createPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setInfoPage(true)
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Server Error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAccCreation = async () => {
        try {

            setIsLoading(true);

            const response = await fetch("http://localhost:1111/profile_info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    name,
                    age
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setUserName(name)
                localStorage.setItem("isLoggedIn", "true");
                setIsLoggedIn(true);
                navigate("/")
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Server Error");
        } finally {
            setIsLoading(false);
        }
    };


    return (


        <>{!infoPage ?
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
                                <input type="text" id="email" className="peer h-12 w-full rounded-full border border-[#454545] bg-[#212121] px-4 pr-12 text-white focus:border-[#7A8FD8] focus:outline-none placeholder:text-white" placeholder={email} disabled />
                                <label
                                    htmlFor="email"
                                    className="absolute left-4 bg-[#212121] px-2 pointer-events-none 
                                
                                       
                                        text-[#aaa]
                                    
                                  top-0 -translate-y-1/2 text-sm "
                                >
                                    email
                                </label>
                            </div>
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
                                <button type="button" className="mt-4 h-12 w-full rounded-full flex justify-center items-center bg-[#f7f7f7] px-4 text-black hover:bg-white transition-colors" onClick={handlePasswordCreation}
                                >
                                    {isLoading ? (
                                        <div className="h-5 w-5 animate-spin  rounded-full border-2 border-black border-t-transparent"></div>
                                    ) : (
                                        "Continue"
                                    )}
                                </button>
                            </div>

                        </div>
                        <div className="mt-10 flex justify-center items-center gap-2">
                            <a href="#" className="underline text-sm text-[#CDD5E0]">Terms of use</a>
                            <div>|</div>
                            <a href="#" className="underline text-sm text-[#CDD5E0]">Privacy Policy</a>
                        </div>
                    </div>
                </main>
            </div> :
            <div className="bg-[#212121] max-w-screen min-h-screen h-auto flex flex-col items-center ">
                <header className="w-full p-5">
                    <h1 className="text-white text-xl font-semibold">ChatGPT</h1>
                </header>
                <main className="flex flex-col justify-center items-center w-1/2">
                    <div className="w-2/3 flex flex-col  items-center p-8">
                        <h2 className="text-3xl font-medium">Tell Us About You</h2>
                        <p className="mt-3 text-center text-[#CDD5E0]">Enter your name and age</p>
                        <div className="mt-7 w-full flex flex-col gap-3">
                            <div className="relative w-full">
                                <input
                                    id="name"
                                    type="text"
                                    placeholder=" "
                                    value={name}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setName(value);
                                    }}
                                    className=" peer h-12 w-full rounded-full border bg-[#212121] px-4 text-white placeholder:text-[#aaa]  focus:outline-none border-[#454545] focus:border-[#7A8FD8] transition-all duration-100 ease-in-out "
                                />

                                <label
                                    htmlFor="name"
                                    className=" absolute left-4 top-1/2 rounded-full px-2 -translate-y-1/2 text-[#aaa] transition-all duration-200 ease-in-out pointer-events-none 
                                
                                peer-focus:top-[-10px] peer-focus:z-[100] peer-focus:bg-[#212121] peer-focus:text-sm peer-focus:font-semibold peer-focus:text-[#7A8FD8] peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:z-[100] peer-[:not(:placeholder-shown)]:bg-[#212121] peer-[:not(:placeholder-shown)]:text-sm  peer-[:not(:placeholder-shown)]:translate-y-0 "
                                >
                                    Name
                                </label>
                            </div>
                            <div className="relative w-full">
                                <input
                                    id="age"
                                    type="age"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder=" "
                                    value={age}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        setAge(value);
                                    }}
                                    className=" peer h-12 w-full rounded-full border bg-[#212121] px-4 text-white placeholder:text-[#aaa]  focus:outline-none border-[#454545] focus:border-[#7A8FD8] transition-all duration-100 ease-in-out "
                                />

                                <label
                                    htmlFor="code"
                                    className=" absolute left-4 top-1/2 rounded-full px-2 -translate-y-1/2 text-[#aaa] transition-all duration-200 ease-in-out pointer-events-none 
                                
                                peer-focus:top-[-10px] peer-focus:z-[100] peer-focus:bg-[#212121] peer-focus:text-sm peer-focus:font-semibold peer-focus:text-[#7A8FD8] peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:z-[100] peer-[:not(:placeholder-shown)]:bg-[#212121] peer-[:not(:placeholder-shown)]:text-sm  peer-[:not(:placeholder-shown)]:translate-y-0 "
                                >
                                    Age
                                </label>
                            </div>
                            <div className="text-center w-full space-y-4">
                                <button type="button" className="mt-4 h-12 w-full rounded-full flex justify-center items-center bg-[#f7f7f7] px-4 text-black hover:bg-white transition-colors" onClick={handleAccCreation}
                                >
                                    {isLoading ? (
                                        <div className="h-5 w-5 animate-spin  rounded-full border-2 border-black border-t-transparent"></div>
                                    ) : (
                                        "Continue"
                                    )}
                                </button>
                            </div>

                        </div>
                        <div className="mt-10 flex justify-center items-center gap-2">
                            <a href="#" className="underline text-sm text-[#CDD5E0]">Terms of use</a>
                            <div>|</div>
                            <a href="#" className="underline text-sm text-[#CDD5E0]">Privacy Policy</a>
                        </div>
                    </div>
                </main>
            </div>

        }</>
    )
}