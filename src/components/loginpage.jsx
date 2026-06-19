import React, { useState, useEffect, useContext } from "react";
import { Phone, X } from "lucide-react";
import Google from "../assets/Google.svg";
import Apple from "../assets/Apple.svg";
import { LoginBoxContext } from "../context/context";
import { LoginContext } from "../context/context";

export default function LoginPage() {
  const { showLogin, setShowLogin } = useContext(LoginBoxContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("")
  const [toggleField, setToggleField] = useState(true)

  const handleSendOtp = async () => {
    try {
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
        setToggleField(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

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
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (<>
    <div onClick={() => setShowLogin(!showLogin)} className="absolute inset-0 bg-black opacity-50 z-40"></div>

    <div className="fixed p-2 inset-0 z-50 flex h-fit my-auto justify-center bg-black/60 sm:items-center sm:p-4" onClick={() => setShowLogin(false)}>
      <div
        className="relative flex max-h-fit w-4/5 flex-col rounded-t-3xl bg-[#212121] text-white shadow-2xl md:max-w-[450px]  sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute right-3 top-3 rounded-full p-2 text-white hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="scrollbar-dark overflow-y-auto px-5 pb-6 pt-14 sm:px-8 sm:pb-8">
          <div className="text-center">
            <h1 className="text-2xl font-normal leading-tight">
              Log in or sign up
            </h1>

            <p className="mx-auto mt-2 max-w-[350px] text-sm text-[#f1f1f1]">
              You’ll get smarter responses and can upload files, images, and more.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-[#444] px-4 text-sm font-semibold hover:bg-[#2a2a2a] transition-colors"
            >
              <img src={Google} alt="Google" className="h-5 w-5" />
              Continue with Google
            </button>

            <button
              type="button"
              className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-[#444] px-4 text-sm font-semibold hover:bg-[#2a2a2a] transition-colors"
            >
              <img src={Apple} alt="Apple" className="h-5 w-5" />
              Continue with Apple
            </button>

            <button
              type="button"
              className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-[#444] px-4 text-sm font-semibold hover:bg-[#2a2a2a] transition-colors"
            >
              <Phone size={20} strokeWidth={1.5} />
              Continue with phone
            </button>
          </div>

          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#555]" />
            <span className="text-sm text-[#999]">OR</span>
            <div className="h-px flex-1 bg-[#555]" />
          </div>

          {toggleField ? <input
            type="email"
            placeholder="Email address"
            value={email}
            autoComplete="email"
            
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-full border border-transparent bg-black px-4 text-white placeholder:text-[#aaa] outline-none focus:border-white"
          /> :
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter OTP"
              value={OTP}
              onChange={(e) => {
                setOTP(e.target.value.replace(/\D/g, ""));
                setOTP(e.target.value)
              }}
              className="h-12 w-full rounded-full border border-transparent bg-black px-4 text-white placeholder:text-[#aaa] outline-none focus:border-white"
            />}

          {toggleField ? <button onClick={handleSendOtp} type="button" className="mt-4 h-12 w-full rounded-full bg-[#f7f7f7] px-4 text-black hover:bg-white transition-colors"
          >
            Send Otp
          </button> :
            <button onClick={handleVerifyOtp} type="button" className="mt-4 h-12 w-full rounded-full bg-[#f7f7f7] px-4 text-black hover:bg-white transition-colors"
            >
              Continue
            </button>
          }
        </div>
      </div>
    </div>
  </>
  )
};