"use client"

import React, { useEffect, useRef } from 'react'

interface Props {
  open: boolean,
  children: React.ReactNode,
  onClose: Function
}

function Modal({
  open,
  children, 
  onClose, 
} : Props) {

  const backdrop = useRef<any>()

  useEffect(() => {
    document.body.classList.toggle('noscroll', open)
  }, [open])

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if(e.target === backdrop.current){
      onClose()
    }
    return null
  }
  
  if(open) {
    return (
      <div 
        className='fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-screen items-center justify-center overflow-hidden bg-[#1e293b99]'
        ref={backdrop}
        onClick={handleClose}
      >
        <div className='box-border flex h-fit w-[90%] max-w-[500px] flex-col content-between rounded-xl bg-white p-5'>
          {children}
        </div>
      </div>
    )
  }
  return null
}

export default Modal