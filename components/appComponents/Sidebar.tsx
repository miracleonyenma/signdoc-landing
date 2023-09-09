"use client";

import React, { useState } from "react";
import logo from "./assets/logo.png";
import control from "./assets/control.png";
import search from "./assets/Search.png";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [open, setOpen] = useState(false);
  // adding two menu styles one for main and the other for user
  const Menus = [
    { title: "Home", icon: "" },
    { title: "Browse", icon: "", gap: true },
    { title: "Activity", icon: "" },
  ];

  // user menu options
  const UserOptions = [
    {
      title: "Favorite songs",
      icon: "",
      gap: false,
    },
    { title: "Your playlists", icon: "", gap: false },
    { title: "Recommendations", icon: "", gap: false },
  ];
  return (
    <div>
      <div className="flex">
        <div
          className={` ${
            open ? "w-72" : " w-0 md:w-20 "
          } absolute z-50 h-screen bg-gray-900 p-[0.6rem] pt-8  duration-300 md:relative md:p-5`}
        >
          <Image
            src={control}
            alt="control"
            className={`absolute -right-3 top-9 w-7 cursor-pointer rounded-full
          border-2 border-dark-purple  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />

          <div className="flex items-center gap-x-4">
            <Image
              src={logo}
              alt="logo"
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`origin-left text-xl font-medium text-white duration-200 ${
                !open && "scale-0"
              }`}
            >
              MiracleIo
            </h1>
          </div>
          <div
            className={`flex flex-col gap-2 pt-10 ${!open && "hidden md:flex"}`}
          >
            {/* main options container */}
            <p className=" text-sm text-slate-500">Main</p>
            <ul className="">
              {Menus.map((Menu, index) => (
                <li
                  key={index}
                  className={`group flex cursor-pointer items-center gap-x-4 rounded-md text-sm text-gray-300 hover:bg-light-white 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}
              ${open ? "p-2" : " flex items-center justify-center py-2"}
              `}
                >
                  <span
                    className={`whitespace-pre duration-500 ${
                      !open && " translate-x-28 overflow-hidden opacity-0"
                    } origin-left duration-200 ${
                      open ? "inline-block" : "hidden"
                    }`}
                  >
                    {Menu.title}
                  </span>
                  <span
                    className={`absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-white px-0 py-0 font-semibold text-gray-900 drop-shadow-lg group-hover:left-20 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300 ${
                      open && "hidden"
                    }`}
                  >
                    {" "}
                    {Menu.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`mt-6 flex flex-col gap-4 pt-10 ${
              !open && "hidden md:flex"
            }`}
          >
            {/* user options container */}
            <p className=" text-sm text-slate-500">Your Music</p>

            {/* create a new playlist */}

            <ul className="">
              {UserOptions.map((Menu, index) => (
                <li
                  key={index}
                  className={`group flex cursor-pointer items-center gap-x-4 rounded-md text-sm text-gray-300 hover:bg-light-white 
              ${Menu.gap ? "mt-9" : "mt-2"} 
              ${open ? "p-2" : " flex items-center justify-center py-2"}
              `}
                >
                  <span
                    className={` whitespace-pre duration-500 ${
                      !open && " translate-x-28 overflow-hidden opacity-0"
                    } origin-left duration-200 ${
                      open ? "inline-block" : "hidden"
                    }`}
                  >
                    {Menu.title}
                  </span>
                  <span
                    className={`absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-white px-0 py-0 font-semibold text-gray-900 drop-shadow-lg group-hover:left-20 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300 ${
                      open && "hidden"
                    } `}
                  >
                    {" "}
                    {Menu.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
