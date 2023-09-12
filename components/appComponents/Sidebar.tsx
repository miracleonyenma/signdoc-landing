"use client";

import React, { useState } from "react";
import logo from "@/public/signdoc-logoalt.png";
import {
  ArrowsOutLineHorizontal,
  HouseSimple,
  FileDashed,
  FolderSimpleUser,
  Desktop,
  DropboxLogo,
  GoogleDriveLogo,
} from "@phosphor-icons/react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [open, setOpen] = useState(false);
  // adding two menu styles one for main and the other for user
  const Menus = [
    { title: "Home", icon: HouseSimple },
    { title: "Templates", icon: FileDashed, gap: false },
    { title: "Shared with Me", icon: FolderSimpleUser },
  ];

  // user menu options
  const UserOptions = [
    {
      title: "Local file",
      icon: Desktop,
      gap: false,
    },
    { title: "Dropbox", icon: DropboxLogo, gap: false },
    { title: "Google Drive", icon: GoogleDriveLogo, gap: false },
  ];
  return (
    <div>
      <div>
        <div
          className={` ${
            open ? "w-72" : " w-0 md:w-20 "
          } sidebar`}
        >
          <div
            className={`absolute -right-3 top-9 w-7 cursor-pointer rounded-full
          border-2 bg-blue-100  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          >
            <ArrowsOutLineHorizontal size={24} color="#2563EB" weight="fill" />
          </div>

          <div className="flex items-center gap-x-4">
            <Image
              src={logo}
              alt="logo"
              height={66}
              width={66}
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`origin-left text-xl font-medium text-white duration-200 ${
                !open && "scale-0"
              }`}
            >
              Signdoc
            </h1>
          </div>
          <div
            className={`flex flex-col gap-2 pt-10 ${!open && "hidden md:flex"}`}
          >
            {/* main options container */}
            <p
              className={`text-base text-white ${
                !open ? "hidden" : "inline-block"
              } font-bold`}
            >
              Navigation
            </p>
            <ul className="">
              {Menus.map((Menu, index) => (
                <li
                  key={index}
                  className={`group flex cursor-pointer items-center gap-x-4 rounded-md text-sm text-gray-300 hover:bg-light-white 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}
              ${open ? "p-2" : " flex items-center justify-center py-2"}
              `}
                >
                  {/* icon */}
                  <Menu.icon weight="bold" size={24} />
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
            <p
              className={`text-base text-white ${
                !open ? "hidden" : "inline-block"
              } font-bold`}
            >
              Import From
            </p>

            {/* Import List */}

            <ul className="">
              {UserOptions.map((Menu, index) => (
                <li
                  key={index}
                  className={`group flex cursor-pointer items-center gap-x-4 rounded-md text-sm text-gray-300 hover:bg-light-white 
              ${Menu.gap ? "mt-9" : "mt-2"} 
              ${open ? "p-2" : " flex items-center justify-center py-2"}
              `}
                >
                  {/* icon */}
                  <Menu.icon weight="bold" size={24} />
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
