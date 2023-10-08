'use client'

import React, { useEffect, useRef } from 'react'

export default function App() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    let PSPDFKit: any;
    ;(async function () {
      PSPDFKit = await import('pspdfkit')
      await PSPDFKit.load({
        container,
        document: '/INV.pdf',
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      })
    })()

    return () => PSPDFKit && PSPDFKit.unload(container)
  }, [])

  return (
    <>
      <div ref={containerRef} style={{ height: '100vh' }} />
      <style global jsx>
        {`
          * {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </>
  )
}
