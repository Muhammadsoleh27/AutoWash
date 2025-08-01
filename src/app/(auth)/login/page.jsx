"use client";

import { useEffect, useState } from "react";
import car from "../../../assets/car-toyota.png";
import Image from "next/image";
import logo from "../../../assets/Group 4 (1).png";
import Login from "@/stores/store";
import { useRouter } from "next/navigation";

const EyeIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
    />
  </svg>
);

const WaterDropIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" />
  </svg>
);

const CarIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0m-11 0a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0M17.5 7H6.5L5 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-6l-1.5-4z" />
  </svg>
);

const SparkleIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.5 2L8.5 8.5L2 9.5L8.5 10.5L9.5 17L10.5 10.5L17 9.5L10.5 8.5L9.5 2Z" />
  </svg>
);

export default function CarWashLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const { error, success, funLoginStore, errorMessage } = Login();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    let user = {
      email: form.email.value,
      password: form.password.value,
    };
    setIsLoading(true);
    funLoginStore(user);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    if (success) {
      window.location = "/";
    } else {
      setIsLoading(false);
    }
  }, [success]);

  const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
    <div
      className="absolute animate-bounce opacity-20"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="w-[100%] min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <FloatingElement delay={0}>
          <div className="top-20 left-10 text-blue-400">
            <WaterDropIcon />
          </div>
        </FloatingElement>
        <FloatingElement delay={1}>
          <div className="top-40 right-20 text-cyan-400">
            <WaterDropIcon />
          </div>
        </FloatingElement>
        <FloatingElement delay={2}>
          <div className="bottom-40 left-20 text-blue-300">
            <WaterDropIcon />
          </div>
        </FloatingElement>
        <SparkleIcon className="absolute top-32 right-32 w-4 h-4 text-yellow-400 animate-pulse" />
        <SparkleIcon
          className="absolute bottom-32 left-32 w-3 h-3 text-white animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <SparkleIcon
          className="absolute top-1/2 left-10 w-5 h-5 text-cyan-400 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
      </div>
      <div className="flex min-h-screen relative z-10">
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border-r border-white/20"></div>
          <div className="relative flex flex-col items-center justify-center w-full h-full p-8 text-white">
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-20">
              <Image
                src={logo}
                alt="car logo"
                className="drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" 
              />
            </div>
            <div className="relative flex items-center justify-center w-full h-full">
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 z-10">
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-80">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-gradient-to-b from-cyan-400/60 to-blue-500/40 rounded-full animate-bounce"
                      style={{
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 40 + 60}px`,
                        left: `${Math.random() * 320}px`,
                        top: `${Math.random() * 100}px`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${1 + Math.random()}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="relative z-20">
                <div className="w-130">
                  <div className="absolute top-8 left-4 w-8 h-12 bg-gradient-to-b from-cyan-200/30 to-blue-300/50 rounded-lg backdrop-blur-sm"></div>
                  <div className="absolute top-8 right-4 w-8 h-12 bg-gradient-to-b from-cyan-200/30 to-blue-300/50 rounded-lg backdrop-blur-sm"></div>
                  <Image src={car} alt="car" className="w-[100%]" />
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-gradient-to-r from-cyan-400/60 to-blue-400/60 rounded-full animate-bounce"
                      style={{
                        width: `${Math.random() * 8 + 4}px`,
                        height: `${Math.random() * 8 + 4}px`,
                        top: `${Math.random() * 160 + 20}px`,
                        left: `${Math.random() * 380 + 10}px`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${1.5 + Math.random()}s`,
                      }}
                    ></div>
                  ))}
                </div>
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-white/60 right-0 rounded-full animate-pulse backdrop-blur-sm"
                    style={{
                      width: `${Math.random() * 10 + 15}px`,
                      height: `${Math.random() * 10 + 15}px`,
                      top: `${Math.random() * 110 + 20}px`,
                      left: `${Math.random() * 310 + 25}px`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random()}s`,
                    }}
                  ></div>
                ))}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-80 h-6 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent rounded-full blur-sm"></div>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 grid grid-cols-3 gap-4 text-center z-20">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-cyan-400 mb-1 text-2xl">💧</div>
                <p className="text-xs text-cyan-200">Eco-Friendly</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-blue-400 mb-1 text-2xl">⚡</div>
                <p className="text-xs text-blue-200">Quick Service</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-purple-400 mb-1 text-2xl">✨</div>
                <p className="text-xs text-purple-200">Premium Care</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none"></div>

          <div className="w-full max-w-md space-y-8 relative z-10">
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-full shadow-xl">
                  <CarIcon />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white">AquaShine Pro</h1>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="text-cyan-200">
                Sign in to manage your car wash services
              </p>
            </div>
            <div className="space-y-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-14 px-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  <div className="relative group">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full h-14 px-6 pr-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-cyan-300 hover:text-cyan-100 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                <img src="" alt="" />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full my-5 h-14 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </span>
                </button>
                {error ? <p className="text-center font-semibold text-xl text-red-400">{errorMessage}</p> : ""}
              </form>
            </div>
            <div className="text-center space-y-4">
              <button
                type="button"
                className="text-cyan-300 hover:text-cyan-100 text-sm transition-colors focus:outline-none hover:underline"
                onClick={() => console.log("Forgot password")}
              >
                Forgot your password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
