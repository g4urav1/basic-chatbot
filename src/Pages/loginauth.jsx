import React, { useState, useContext } from "react";
import { LoginBoxContext, LoginContext, mailContext } from "../context/context";
import { useNavigate } from "react-router-dom";



export default function LoginAuth() {
    const [OTP, setOTP] = useState("")
    const { email, setEmail } = useContext(mailContext);
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const { showLogin, setShowLogin } = useContext(LoginBoxContext);
    const navigate = useNavigate();

    const handleVerifyOtp = async () => {
        try {


            const response = await fetch(
                "http://localhost:1111/loginAuth",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        otp: OTP,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setIsLoggedIn(true);
                setShowLogin(false);

                localStorage.setItem("isLoggedIn", "true");

                alert(data.message);
                navigate("/");
            }



            else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Server Error");
        }
    };
    const handleSendOtp = async () => {
        try {
            setIsSendingOtp(true);
            const response = await fetch("http://localhost:1111/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Server Error");
        } finally {
            setIsSendingOtp(false);
        }
    };
    return (

        <div className="bg-[#212121] max-w-screen h-auto flex flex-col items-center ">
            <header className="w-full p-5">
                <h1 className="text-white text-xl font-semibold">ChatGPT</h1>
            </header>
            <main className="flex flex-col justify-center items-center w-1/2">
                <div className="w-2/3 flex flex-col  items-center p-8">
                    <h2 className="text-3xl font-medium">Check your inbox</h2>
                    <p className="mt-3 text-[#CDD5E0]">Enter the verification code we just sent to {email}</p>
                    <div className="mt-7 w-full flex flex-col gap-3">
                        <div className="relative">
                            <input
                                id="code"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder=" "
                                value={OTP}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                                    setOTP(value);
                                }}
                                className=" peer h-12 w-full rounded-full border bg-[#212121] px-4 text-white placeholder:text-[#aaa]  focus:outline-none border-[#454545] focus:border-[#7A8FD8] transition-all duration-100 ease-in-out "
                            />

                            <label
                                htmlFor="code"
                                className=" absolute left-4 top-1/2 rounded-full px-2 -translate-y-1/2 text-[#aaa] transition-all duration-200 ease-in-out pointer-events-none 
                                
                                peer-focus:top-[-10px] peer-focus:z-[100] peer-focus:bg-[#212121] peer-focus:text-sm peer-focus:font-semibold peer-focus:text-[#7A8FD8] peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:z-[100] peer-[:not(:placeholder-shown)]:bg-[#212121] peer-[:not(:placeholder-shown)]:text-sm  peer-[:not(:placeholder-shown)]:translate-y-0 "
                            >
                                Code
                            </label>
                        </div>
                        <div className="text-center w-full space-y-4">
                            <button onClick={handleVerifyOtp} type="button" className="mt-4 h-12 w-full rounded-full flex justify-center items-center bg-[#f7f7f7] px-4 text-black hover:bg-white transition-colors"
                            >
                                {isSendingOtp ? (
                                    <div className="h-5 w-5 animate-spin  rounded-full border-2 border-black border-t-transparent"></div>
                                ) : (
                                    "Continue"
                                )}
                            </button>
                            <button onClick={handleSendOtp} className="text-[#CDD5E0] ">Resend email</button>
                        </div>
                        <div className="my-5 flex items-center gap-4">
                            <div className="h-px flex-1 bg-[#555]" />
                            <span className="text-sm text-white font-semibold">OR</span>
                            <div className="h-px flex-1 bg-[#555]" />
                        </div>
                        <button onClick={handleVerifyOtp} type="button" className="mt-4 h-12 w-full rounded-full text-[#CDD5E0] px-4 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            Continue with password
                        </button>
                    </div>
                    <div className="mt-10 flex justify-center items-center gap-2">
                        <a href="#" className="underline text-sm text-[#CDD5E0]">Terms of use</a>
                        <div>|</div>
                        <a href="#" className="underline text-sm text-[#CDD5E0]">Privacy Policy</a>
                    </div>
                </div>
            </main>
        </div>

    );
}


