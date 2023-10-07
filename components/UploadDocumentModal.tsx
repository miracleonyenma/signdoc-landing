import { useState } from "react";
import { Button } from './ui/button'
import Dropzone from './Dropzone'
import axios from 'axios'
import confetti from '../assets/img/confetti.png'
import Modal from "./Modal";
import { SpinnerGap } from "@phosphor-icons/react";
import Image from 'next/image'

function UploadDocumentModal({
  open, 
  setOpen
}: {open: boolean, setOpen: (arg:boolean) => void}) {

  const [file, setFile] = useState<string | Blob>('')
  const [inputValues, setInputValues] = useState({ name: '', description: '' })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

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
    <Modal open={open} onClose={() => {setOpen(false); setUploadSuccess(false)}}>
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
  )
}

export default UploadDocumentModal
