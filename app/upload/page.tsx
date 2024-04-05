"use client";
import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

interface CoudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublictId] = useState("");

  return (
    <>
      {publicId && (
        <CldImage src={publicId} width={270} height={180} alt="My Image" />
      )}
      <CldUploadWidget
        uploadPreset="ylz6b7tw"
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 5,
          styles: {},
        }}
        onSuccess={(result, { widget }) => {
          if (result.event !== "success") return;
          const info = result.info as CoudinaryResult;
          setPublictId(info.public_id);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload C
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
