"use client";

import Login from "@/stores/store";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Component() {
  const { error, success, funRegisterStore, errorMessage, ConfirmToken } =
    Login();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    agreeToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      email: formData.email,
      fullname: formData.fullName,
      phone_number: `992${formData.phoneNumber}`,
      password: formData.password,
    };
    funRegisterStore(user);
  };
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (success) {
      setOpen(true);
    }
  }, [success]);

  useEffect(() => {
    if (localStorage.getItem("super_admin") != "admin@gmail.com") {
      router.push("/");
    }
  }, []);

  const handleConfirmToken = () => {
    ConfirmToken(token);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-[70%]">
      {/* Token Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-lg border border-blue-200 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-gray-800 flex items-center justify-center space-x-2">
              <div className="text-2xl">🔐</div>
              <span>Verify Your Account</span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 p-2">
            <p className="text-gray-600 text-center text-sm">
              Please enter the verification token sent to your email
            </p>
            <div className="relative">
              <Input
                placeholder="Enter verification token..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="pl-10 h-12 border-2 border-blue-200 focus:border-blue-500 rounded-xl"
              />
              <div className="absolute left-3 top-3 text-gray-400">🔑</div>
            </div>
            <Button
              onClick={handleConfirmToken}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Verify Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full max-w-lg">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Create New Account
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Join our management platform today
          </p>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold border border-blue-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Admin Registration Portal</span>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-2xl font-bold mb-2">Registration Details</h2>
              <p className="text-blue-100">
                Please provide your information below
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="relative">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none hover:border-gray-400"
                    placeholder="Enter your full name"
                    required
                  />
                  <div className="absolute left-4 top-4 text-gray-400 text-lg">
                    👤
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none hover:border-gray-400"
                    placeholder="your.email@example.com"
                    required
                  />
                  <div className="absolute left-4 top-4 text-gray-400 text-lg">
                    📧
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="relative">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <div className="relative flex items-center gap-40">
                  <div className="absolute left-9 top-4 text-gray-600 font-medium pointer-events-none z-10">
                    +992 |
                  </div>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full pl-20 pr-4 py-4 ml-1 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none hover:border-gray-400"
                    placeholder="XX XXX XXXX"
                    required
                  />
                  <div className="absolute left-4 top-4 text-gray-400 text-lg">
                    📱
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none hover:border-gray-400"
                    placeholder="Create a strong password"
                    required
                  />
                  <div className="absolute left-4 top-4 text-gray-400 text-lg">
                    🔒
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-2 border-gray-400 rounded-md transition-colors"
                    required
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="text-sm text-gray-700 leading-relaxed"
                  >
                    I acknowledge that I have read and agree to the{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 font-semibold underline decoration-2 underline-offset-2 transition-colors"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 font-semibold underline decoration-2 underline-offset-2 transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-red-800 font-medium">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.agreeToTerms}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform
                  ${
                    formData.agreeToTerms
                      ? "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 focus:ring-4 focus:ring-blue-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"
                  }
                `}
              >
                <div className="flex items-center justify-center space-x-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Create Account</span>
                </div>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-500 text-sm">
                Already have an account? Contact your system administrator
              </p>
              <div className="mt-3 text-gray-400 text-xs">
                Secure registration • Protected by encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
