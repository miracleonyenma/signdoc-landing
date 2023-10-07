"use client"

import UploadDocumentModal from "@/components/UploadDocumentModal";
import { useState } from "react";

const page = () => {

  const [uploadFile, setUploadFile] = useState(false)

  return (
    <div>
      {/* main application landing page */}
      <button className="p-3 bg-black text-white" onClick={() => setUploadFile(true)}>
        Upload Button
      </button>
      
      <h1>Hello World</h1>
      <UploadDocumentModal 
        open={uploadFile}
        setOpen={setUploadFile}
      />
    </div>
  );
};

export default page;
