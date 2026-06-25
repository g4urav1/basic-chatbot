import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, X } from "lucide-react";
import Google from "../assets/Google.svg";
import Apple from "../assets/Apple.svg";
import { LoginBoxContext, NewUserContext } from "../context/context";
import { mailContext } from "../context/context";

export default function LoginPage() {
  const { showLogin, setShowLogin } = useContext(LoginBoxContext);
  const { email, setEmail } = useContext(mailContext);
  const { isNewUser, setIsNewUser } = useContext(NewUserContext);
  const navigate = useNavigate();
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const handleSendOtp = async () => {

    console.log("handleSendOtp called");

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


      console.log("Response received:", response);

      const data = await response.json();



      console.log("Backend data:", data);


      if (response.ok) {

        localStorage.setItem("email", email);
        setIsNewUser(data.isNewUser);
        console.log(isNewUser)
        console.log("isNewUser from backend:", data.isNewUser);

        alert(data.message);

        navigate("/login");
        
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

          <input type="email" placeholder="Email address" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} className="h-12 w-full rounded-full border border-transparent bg-black px-4 text-white placeholder:text-[#aaa] outline-none focus:border-white"
          />
          <button onClick={handleSendOtp} type="button" className="mt-4 h-12 w-full rounded-full bg-[#f7f7f7] px-4 flex justify-center items-center text-black hover:bg-white transition-colors"
          >
            {isSendingOtp ? (
              <div className="h-5 w-5 animate-spin  rounded-full border-2 border-black border-t-transparent"></div>
            ) : (
              "Send Otp"
            )}

          </button>
        </div>
      </div>
    </div>
  </>
  )
};