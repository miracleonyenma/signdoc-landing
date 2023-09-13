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
  Question,
} from "@phosphor-icons/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useSideBarContext } from "@/context/AppContext";

const Sidebar = () => {
  // Sidebar context
  const pathname = usePathname();
  const { sideBarState, setSideBarState } = useSideBarContext();
  console.log({
    sideBarState,
    setSideBarState,
  });

  // const [open, setOpen] = useState(false);
  // adding two menu styles one for main and the other for user
  const Menus = [
    { title: "Home", icon: HouseSimple, path: "/", gap: false },
    { title: "Templates", icon: FileDashed, path: "/templates", gap: false },
    { title: "Shared with Me", path: "/shared", icon: FolderSimpleUser },
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

  const handleToggleSideBar = () => {
    console.log(sideBarState.isActive);
    setSideBarState((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
    }));
  };

  return (
    <div>
      <div>
        <div
          className={` ${
            sideBarState.isActive ? "w-72" : " w-0 md:w-20 "
          } sidebar`}
        >
          <div
            className={`absolute -right-3 top-9 w-7 cursor-pointer rounded-full
          border-2 bg-blue-100  ${!sideBarState.isActive && "rotate-180"}`}
            onClick={handleToggleSideBar}
          >
            <ArrowsOutLineHorizontal size={24} color="#2563EB" weight="fill" />
          </div>

          <div
            className={`flex items-center gap-x-4
              ${!sideBarState.isActive && "hidden md:flex"}`}
          >
            <Image
              src={logo}
              alt="logo"
              height={66}
              width={66}
              className={`cursor-pointer duration-500 ${
                sideBarState.isActive && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`origin-left text-xl font-medium text-white duration-200 ${
                !sideBarState.isActive && "scale-0"
              }`}
            >
              Signdoc
            </h1>
          </div>
          <div
            className={`flex flex-col gap-2 pt-10 ${
              !sideBarState.isActive && "hidden md:flex"
            }`}
          >
            {/* main options container */}
            <p
              className={`text-base text-white ${
                !sideBarState.isActive ? "hidden" : "inline-block"
              } font-bold`}
            >
              Navigation
            </p>
            <ul className="">
              {Menus.map((Menu, index) => {
                const isActive = pathname.startsWith(Menu.path);
                return (
                  <li
                    key={index}
                    className={`group flex cursor-pointer items-center gap-x-4 rounded-md text-white hover:bg-light-white 
              ${Menu.gap ? "mt-9" : "mt-2"}
              ${
                sideBarState.isActive
                  ? "p-2"
                  : " flex items-center justify-center py-2"
              }
              ${isActive ? "sidebar__link--active" : ""}`}
                  >
                    {/* icon */}
                    <Menu.icon weight="bold" size={24} />
                    <span
                      className={`whitespace-pre duration-500 ${
                        !sideBarState.isActive &&
                        " translate-x-28 overflow-hidden opacity-0"
                      } origin-left duration-200 text-base font-semibold text-white ${
                        sideBarState.isActive ? "inline-block" : "hidden"
                      } `}
                    >
                      {Menu.title}
                    </span>
                    <span
                      className={`absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md text-sm bg-white px-0 py-0 font-semibold text-gray-900 drop-shadow-lg group-hover:left-20 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300 ${
                        sideBarState.isActive && "hidden"
                      }`}
                    >
                      {" "}
                      {Menu.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            className={`mt-6 flex flex-grow flex-col gap-4 pt-10 ${
              !sideBarState.isActive && "hidden md:flex"
            }`}
          >
            <p
              className={`text-base text-white ${
                !sideBarState.isActive ? "hidden" : "inline-block"
              } font-bold`}
            >
              Import From
            </p>

            {/* Import List */}

            <ul className="">
              {UserOptions.map((Menu, index) => (
                <li
                  key={index}
                  className={`group flex cursor-pointer items-center gap-x-4 rounded-md text-white hover:bg-light-white 
              ${Menu.gap ? "mt-9" : "mt-2"} 
              ${
                sideBarState.isActive
                  ? "p-2"
                  : " flex items-center justify-center py-2"
              }
              `}
                >
                  {/* icon */}
                  <Menu.icon weight="bold" size={24} />
                  <span
                    className={` whitespace-pre duration-500 ${
                      !sideBarState.isActive &&
                      " translate-x-28 overflow-hidden opacity-0"
                    } origin-left duration-200 text-base font-semibold text-white ${
                      sideBarState.isActive ? "inline-block" : "hidden"
                    }`}
                  >
                    {Menu.title}
                  </span>
                  <span
                    className={`absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md text-sm bg-white px-0 py-0 font-semibold text-gray-900 drop-shadow-lg group-hover:left-20 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300 ${
                      sideBarState.isActive && "hidden"
                    } `}
                  >
                    {" "}
                    {Menu.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* contact support */}
          <div
            className={`sidebar__support group flex cursor-pointer items-center gap-x-4 rounded-md text-white hover:bg-light-white 
              ${
                sideBarState.isActive
                  ? "p-2"
                  : " flex items-center justify-center py-2"
              }
              ${!sideBarState.isActive && "hidden md:flex"}`}
          >
            <Question weight="bold" size={24} />
            <span
              className={` whitespace-pre duration-500 ${
                !sideBarState.isActive &&
                " translate-x-28 overflow-hidden opacity-0"
              } origin-left duration-200 text-base font-semibold text-white ${
                sideBarState.isActive ? "inline-block" : "hidden"
              }`}
            >
              Support
            </span>
            <span
              className={`absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md text-sm bg-white px-0 py-0 font-semibold text-gray-900 drop-shadow-lg group-hover:left-20 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300 ${
                sideBarState.isActive && "hidden"
              } `}
            >
              {" "}
              Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
