'use client'

import React, { useState } from 'react'
import logo from '@/public/signdoc-logoalt.png'
import {
  ArrowsOutLineHorizontal,
  HouseSimple,
  FileDashed,
  FolderSimpleUser,
  Desktop,
  Question,
  SpinnerGap,
} from '@phosphor-icons/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSideBarContext } from '@/context/AppContext'
import Modal from '../Modal'
import { Button } from '../ui/button'
import Dropzone from '../Dropzone'
import axios from 'axios'
import confetti from '../../assets/img/confetti.png'

const Sidebar = () => {
  // Sidebar context
  const pathname = usePathname()

  const [uploadFile, setUploadFile] = useState(false)
  const [file, setFile] = useState<string | Blob>('')
  const [inputValues, setInputValues] = useState({ name: '', description: '' })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const { sideBarState, setSideBarState } = useSideBarContext()

  // adding two menu styles one for main and the other for user
  const Menus = [
    { title: 'Home', icon: HouseSimple, path: '/app', gap: false },
    {
      title: 'Templates',
      icon: FileDashed,
      path: '/app/templates',
      gap: false,
    },
    { title: 'Shared with Me', path: '/app/shared', icon: FolderSimpleUser },
  ]

  // user menu options
  const UserOptions = [
    {
      title: 'Local file',
      icon: Desktop,
      gap: false,
      uploadFile: () => setUploadFile(true),
    },
    // { title: "Dropbox", icon: DropboxLogo, gap: false },
    // { title: "Google Drive", icon: GoogleDriveLogo, gap: false },
  ]

  const handleToggleSideBar = () => {
    setSideBarState((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
    }))
  }

  const handleFileUpload = async (e: any) => {
    e.preventDefault()

    setIsUploading(true)
    const formData = new FormData()
    formData.append('doc', file)
    formData.append('name', inputValues.name)
    inputValues.description &&
      formData.append('description', inputValues.description)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    try {
      const res = await axios.post(
        `/api/documents`,
        formData,
        config,
      )

      setIsUploading(false)
      setUploadSuccess(true)
      setInputValues({name: '', description: ''})
      setFile('')
    } catch (err) {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <div>
        <div
          className={` ${
            sideBarState.isActive
              ? 'sidebar--width-active'
              : 'sidebar--width-inactive'
          } sidebar`}
        >
          <div
            className={`sidebar__toggler  ${
              !sideBarState.isActive && 'rotate-180'
            }`}
            onClick={handleToggleSideBar}
          >
            <ArrowsOutLineHorizontal size={24} color="#2563EB" weight="fill" />
          </div>

          <div
            className={`sidebar__logo-cont
              ${!sideBarState.isActive && 'hidden md:flex'}`}
          >
            <Image
              src={logo}
              alt="logo"
              height={66}
              width={66}
              className={`sidebar-logo ${
                sideBarState.isActive && 'rotate-[360deg]'
              }`}
            />
            <h1
              className={`sidebar-title ${!sideBarState.isActive && 'scale-0'}`}
            >
              Signdoc
            </h1>
          </div>
          <div
            className={`sidebar__item-cont ${
              !sideBarState.isActive && 'hidden md:flex'
            }`}
          >
            {/* main options container */}
            <p
              className={`sidebar__subtitles ${
                !sideBarState.isActive ? 'hidden' : 'inline-block'
              }`}
            >
              Navigation
            </p>
            <ul>
              {Menus.map((Menu, index) => {
                const isActive = pathname == Menu.path
                return (
                  <li
                    key={index}
                    className={`group gap-x-4 sidebar-list 
              ${Menu.gap ? 'mt-9' : 'mt-2'}
              ${
                sideBarState.isActive
                  ? 'p-2'
                  : ' flex items-center justify-center py-2'
              }
              ${isActive ? 'sidebar__link--active' : ''}`}
                  >
                    {/* icon */}
                    <Menu.icon weight="bold" size={24} />
                    <Link
                      href={Menu.path}
                      className={`sidenav-list ${
                        !sideBarState.isActive && 'sidenav-list--inactive'
                      }  ${sideBarState.isActive ? 'inline-block' : 'hidden'} `}
                    >
                      {Menu.title}
                    </Link>
                    <span
                      className={`sidenav--hoverlist group-hover:left-20 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300 ${
                        sideBarState.isActive && 'hidden'
                      }`}
                    >
                      {' '}
                      {Menu.title}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div
            className={`mt-6 flex flex-grow flex-col gap-4 pt-10 ${
              !sideBarState.isActive && 'hidden md:flex'
            }`}
          >
            <p
              className={`sidebar__subtitles ${
                !sideBarState.isActive ? 'hidden' : 'inline-block'
              } `}
            >
              Import From
            </p>

            {/* Import List */}

            <ul className="">
              {UserOptions.map((Menu, index) => (
                <li
                  key={index}
                  onClick={Menu.uploadFile}
                  className={`group  gap-x-4 sidebar-list  
              ${Menu.gap ? 'mt-9' : 'mt-2'} 
              ${
                sideBarState.isActive
                  ? 'p-2'
                  : ' flex items-center justify-center py-2'
              }
              `}
                >
                  {/* icon */}
                  <Menu.icon weight="bold" size={24} />
                  <span
                    className={` sidenav-list ${
                      !sideBarState.isActive &&
                      ' translate-x-28 overflow-hidden opacity-0'
                    }  ${sideBarState.isActive ? 'inline-block' : 'hidden'}`}
                  >
                    {Menu.title}
                  </span>
                  <span
                    className={`sidenav--hoverlist group-hover:left-20 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300 ${
                      sideBarState.isActive && 'hidden'
                    } `}
                  >
                    {' '}
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
                sideBarState.isActive ? 'support--active' : ' support--inactive'
              }
              ${!sideBarState.isActive && 'hidden md:flex'}`}
          >
            <Question weight="bold" size={24} />
            <span
              className={`support-title ${
                !sideBarState.isActive && 'support-title--inactive'
              }  ${sideBarState.isActive ? 'inline-block' : 'hidden'}`}
            >
              Support
            </span>
            <span
              className={`support-hovertitle ${
                sideBarState.isActive && 'hidden'
              } `}
            >
              {' '}
              Support
            </span>
          </div>
        </div>
      </div>
      <Modal open={uploadFile} onClose={() => {setUploadFile(false); setUploadSuccess(false)}}>
        {!uploadSuccess &&
          <>
            <h2 className="font-semibold text-xl mb-5">Upload document</h2>
            <form className="flex flex-col gap-4" onSubmit={handleFileUpload}>
              <div>
                <label htmlFor="name" className="block mb-1">
                  Document name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={inputValues.name}
                  onChange={(e) =>
                    setInputValues({ ...inputValues, name: e.target.value })
                  }
                  className="h-[40px] border w-full border-solid rounded-md border-gray-300 px-2 focus:outline-none"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label htmlFor="description" className="block mb-1">
                  Document description
                </label>
                <textarea
                  value={inputValues.description}
                  onChange={(e) =>
                    setInputValues({ ...inputValues, description: e.target.value })
                  }
                  id="description"
                  className="w-full border border-solid rounded-md border-gray-300 p-2 h-[100px] focus:outline-none"
                  placeholder="Enter description"
                ></textarea>
              </div>
              <Dropzone setFile={setFile} />
              <Button
                disabled={!inputValues.name || !file || isUploading}
                className="w-fit ml-auto mt-3"
              >
                Upload{' '}
                <SpinnerGap
                  size={20}
                  className={`ml-1 ${isUploading ? 'animate-spin' : 'hidden'}`}
                />
              </Button>
            </form>
          </>
        }
        {uploadSuccess &&
          <div>
            <Image src={confetti} alt='confetti' className='m-auto'/>
            <h5 className='text-center mt-3 text-xl font-medium'>Document has successfully been uploaded</h5>
          </div>
        }
      </Modal>
    </div>
  )
}

export default Sidebar
