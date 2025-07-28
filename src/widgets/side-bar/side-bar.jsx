"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "../../assets/Group 4 (1).png";
import Image from "next/image";

const Side_bar = () => {
  const pathname = usePathname();
  const [superAdmin, setSuperAdmin] = useState("");

  useEffect(() => {
    const storedAdmin = localStorage.getItem("super_admin");
    setSuperAdmin(storedAdmin || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("super_admin");
    window.location.href = "/login";
  };

  const navigationItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
      description: "Overview",
    },
    {
      href: "/cars",
      label: "Cars",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-car-icon lucide-car"
        >
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      ),
      description: "Vehicle Management",
    },
    {
      href: "/employees",
      label: "Employees",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      ),
      description: "Team Management",
    },
    {
      href: "/services",
      label: "Services",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
          />
        </svg>
      ),
      description: "Service Types",
    },
    {
      href: "/washstations",
      label: "Wash Stations",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-waypoints-icon lucide-waypoints"
        >
          <circle cx="12" cy="4.5" r="2.5" />
          <path d="m10.2 6.3-3.9 3.9" />
          <circle cx="4.5" cy="12" r="2.5" />
          <path d="M7 12h10" />
          <circle cx="19.5" cy="12" r="2.5" />
          <path d="m13.8 17.7 3.9-3.9" />
          <circle cx="12" cy="19.5" r="2.5" />
        </svg>
      ),
      description: "Station Management",
    },
  ];

  // ... rest of the component remains the same (admin register + user info + logout section)
  // You can paste the rest of your JSX below this as-is.

  return (
    <div className="w-[350px] h-[97vh] my-3 left-4 sticky top-5 bottom-0">
      {/* Main Sidebar Container */}
      <div className="h-full bg-gradient-to-br from-blue-400 via-blue-400 to-indigo-400 rounded-2xl shadow-2xl border border-blue-700/30 overflow-hidden relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

        {/* Content Container */}
        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Logo Section */}
          <div className="mb-8">
            <div className="bg-white/10 flex items-center justify-between backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Image src={logo} alt="Car Wash Logo" className="w-[100px]" />
              <div className="mt-4 text-center">
                <h2 className="text-blue-800 font-bold text-lg">
                  Car Wash Pro
                </h2>
                <p className="text-blue-950 text-sm">Management System</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-3 ">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`group relative overflow-hidden rounded-xl transition-all duration-300 my-3 ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 scale-105"
                      : "bg-white/10 hover:bg-white/20 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-102"
                  }`}
                >
                  {/* Active indicator */}
                  {pathname === item.href && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                  )}

                  <div className="p-4 flex items-center space-x-4">
                    <div
                      className={`text-2xl transition-transform duration-300 ${
                        pathname === item.href
                          ? "scale-110"
                          : "group-hover:scale-110"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-semibold transition-colors duration-300 ${
                          pathname === item.href
                            ? "text-white"
                            : "text-blue-100 group-hover:text-white"
                        }`}
                      >
                        {item.label}
                      </div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          pathname === item.href
                            ? "text-blue-100"
                            : "text-blue-300 group-hover:text-blue-200"
                        }`}
                      >
                        {item.description}
                      </div>
                    </div>
                    <div
                      className={`transition-all duration-300 ${
                        pathname === item.href
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Admin Register Link */}
            {superAdmin === "admin@gmail.com" && (
              <Link href="/register">
                <div
                  className={`group relative overflow-hidden rounded-xl transition-all duration-300 border-2 border-dashed border-blue-400/50 ${
                    pathname === "/register"
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30 scale-105 border-solid border-purple-400"
                      : "bg-white/5 hover:bg-white/15 hover:border-blue-400 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-102"
                  }`}
                >
                  {pathname === "/register" && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                  )}

                  <div className="p-4 flex items-center space-x-4">
                    <div
                      className={`text-2xl transition-transform duration-300 ${
                        pathname === "/register"
                          ? "scale-110"
                          : "group-hover:scale-110"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-crown-icon lucide-crown"
                      >
                        <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
                        <path d="M5 21h14" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-semibold transition-colors duration-300 ${
                          pathname === "/register"
                            ? "text-white"
                            : "text-purple-200 group-hover:text-white"
                        }`}
                      >
                        Register
                      </div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          pathname === "/register"
                            ? "text-purple-100"
                            : "text-purple-300 group-hover:text-purple-200"
                        }`}
                      >
                        Admin Only
                      </div>
                    </div>
                    <div className="bg-purple-500/30 text-purple-200 text-xs px-2 py-1 rounded-full font-medium">
                      ADMIN
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </nav>

          {/* User Info & Logout Section */}
          <div className="mt-8 space-y-4">
            {/* User Profile Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {superAdmin ? superAdmin.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm truncate">
                    {superAdmin === "admin@gmail.com" ? "Super Admin" : "User"}
                  </div>
                  <div className="text-blue-200 text-xs truncate">
                    {superAdmin || "user@example.com"}
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="text-xl transition-transform duration-300 group-hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                    />
                  </svg>
                </div>
                <span className="text-white font-semibold">Logout</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Side_bar;
