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
            sideBarState.isActive
              ? "sidebar--width-active"
              : "sidebar--width-inactive"
          } sidebar`}
        >
          <div
            className={`sidebar__toggler  ${
              !sideBarState.isActive && "rotate-180"
            }`}
            onClick={handleToggleSideBar}
          >
            <ArrowsOutLineHorizontal size={24} color="#2563EB" weight="fill" />
          </div>

          <div
            className={`sidebar__logo-cont
              ${!sideBarState.isActive && "hidden md:flex"}`}
          >
            <Image
              src={logo}
              alt="logo"
              height={66}
              width={66}
              className={`sidebar-logo ${
                sideBarState.isActive && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`sidebar-title ${!sideBarState.isActive && "scale-0"}`}
            >
              Signdoc
            </h1>
          </div>
          <div
            className={`sidebar__item-cont ${
              !sideBarState.isActive && "hidden md:flex"
            }`}
          >
            {/* main options container */}
            <p
              className={`sidebar__subtitles ${
                !sideBarState.isActive ? "hidden" : "inline-block"
              }`}
            >
              Navigation
            </p>
            <ul>
              {Menus.map((Menu, index) => {
                const isActive = pathname.startsWith(Menu.path);
                return (
                  <li
                    key={index}
                    className={`group gap-x-4 sidebar-list 
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
                      className={`sidenav-list ${
                        !sideBarState.isActive && "sidenav-list--inactive"
                      }  ${sideBarState.isActive ? "inline-block" : "hidden"} `}
                    >
                      {Menu.title}
                    </span>
                    <span
                      className={`sidenav--hoverlist group-hover:left-20 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300 ${
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
              className={`sidebar__subtitles ${
                !sideBarState.isActive ? "hidden" : "inline-block"
              } `}
            >
              Import From
            </p>

            {/* Import List */}

            <ul className="">
              {UserOptions.map((Menu, index) => (
                <li
                  key={index}
                  className={`group  gap-x-4 sidebar-list  
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
                    className={` sidenav-list ${
                      !sideBarState.isActive &&
                      " translate-x-28 overflow-hidden opacity-0"
                    }  ${sideBarState.isActive ? "inline-block" : "hidden"}`}
                  >
                    {Menu.title}
                  </span>
                  <span
                    className={`sidenav--hoverlist group-hover:left-20 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300 ${
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
            className={`sidebar__support group gap-x-4 
              ${
                sideBarState.isActive ? "support--active" : " support--inactive"
              }
              ${!sideBarState.isActive && "hidden md:flex"}`}
          >
            <Question weight="bold" size={24} />
            <span
              className={`support-title ${
                !sideBarState.isActive && "support-title--inactive"
              }  ${sideBarState.isActive ? "inline-block" : "hidden"}`}
            >
              Support
            </span>
            <span
              className={`support-hovertitle ${
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
