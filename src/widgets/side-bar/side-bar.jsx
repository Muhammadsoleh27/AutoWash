"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import logo from "../../assets/Group 4 (1).png";
import Image from "next/image";

const Side_bar = () => {
  const pathname = usePathname();
  return (
    <div className="w-[350px] rounded-xl p-6 bg-gradient-to-b from-[#00aaff] to-[#1e00ff] h-[97vh] my-3 left-4 sticky top-5 bottom-0">
      <Image src={logo} alt="logo"/>
      <div className="my-5 flex flex-col gap-4">
        <Link href={"/"}>
          <button
            className={`text-white bg-[#015eff95] w-full rounded-xl py-2.5 active:bg-[#0400ff] ${
              pathname == "/" ? "bg-[#0400ff]" : ""
            } cursor-pointer`}
          >
            Home
          </button>
        </Link>
        <Link href={"/cars"}>
          <button
            className={`text-white bg-[#015eff95] w-full rounded-xl py-2.5 active:bg-[#0400ff] ${
              pathname == "/cars" ? "bg-[#0400ff]" : ""
            } cursor-pointer`}
          >
            Cars
          </button>
        </Link>
        <Link href={"/employees"}>
          <button
            className={`text-white bg-[#015eff95] w-full rounded-xl py-2.5 active:bg-[#0400ff] ${
              pathname == "/employees" ? "bg-[#0400ff]" : ""
            } cursor-pointer`}
          >
            Employees
          </button>
        </Link>
        <Link href={"/services"}>
          <button
            className={`text-white bg-[#015eff95] w-full rounded-xl py-2.5 active:bg-[#0400ff] ${
              pathname == "/services" ? "bg-[#0400ff]" : ""
            } cursor-pointer`}
          >
            Services
          </button>
        </Link>
        <Link href={"/washstations"}>
          <button
            className={`text-white bg-[#015eff95] w-full rounded-xl py-2.5 active:bg-[#0400ff] ${
              pathname == "/washstations" ? "bg-[#0400ff]" : ""
            } cursor-pointer`}
          >
            Wash Stations
          </button>
        </Link>
        <button
          className={`text-white bg-[#015eff95] w-full rounded-xl py-2.5 active:bg-[#0400ff] ${
            pathname == "/washstations" ? "bg-[#0400ff]" : ""
          } cursor-pointer`}
          onClick={() => {
            localStorage.removeItem("access_token");
            window.location = "login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Side_bar;
