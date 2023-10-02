"use client"

import { File} from '@phosphor-icons/react';
import {useDropzone} from 'react-dropzone';
import { useEffect, memo, Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

function Dropzone({setFile} : {setFile: Dispatch<SetStateAction<string | Blob>>}) {

  const [fileErr, setFileErr] = useState('')

  const {
    getRootProps, 
    open, 
    getInputProps, 
    fileRejections,
    acceptedFiles,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: ({'application/pdf': ['.pdf'], 'application/msword': ['.doc']}),
  })

  // Set error state when image uploading is not sucessfull
  useEffect(() => {
    if(!fileRejections.length) return setFileErr('')
    else setFileErr(fileRejections[0]?.errors[0]?.message)
    setFile('')
  }, [fileRejections])

  // set the state to the choosen images or video and create a URL that displays the choosen files
  useEffect(() => {
    if(acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }, [acceptedFiles, setFile])

  return (
    <section>
      {fileErr && <p className='mb-1 text-red-400 font-semibold' style={{marginBottom: '5px', marginTop: 0}}>{fileErr}</p>}
      <div {...getRootProps({className: 'flex w-full flex-col items-center gap-4 rounded-lg border border-dashed border-[#60A5FA] bg-[#EFF6FF] py-5'})}>
        <input {...getInputProps()} />
        <File size={35} className='text-blue-500' weight='thin'/>
        {acceptedFiles.length
          ? <p>{acceptedFiles[0].name}</p>
          : <p>Drag and drop or <span onClick={open} className='cursor-pointer text-blue-500'>click here</span> to upload a file</p>
        }
      </div>
    </section>
  );
}

export default memo(Dropzone)