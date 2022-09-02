import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineDelete, AiOutlineUpload } from "react-icons/ai";
import axios from "axios";

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const dropzone = {
  width: "100%",
  height: "100%",
  border: "dashed 3px",
  borderColor: "#ccc",
  borderRadius: "5px",
  textAlign: "center",
  padding: "80px",
  marginBottom: "20px",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
  outline: "none",
} as React.CSSProperties;

function Dropzone(props: any) {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState(Array<URL>());

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const uploadToCloudinary = () => {
    setUploadedFiles([]);
    // Push all the axios request promise into a single array
    const uploaders = files.map((file) => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Replace the preset name with your own
      // eslint-disable-next-line no-bitwise
      formData.append("timestamp", ((Date.now() / 1000) | 0).toString());

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios.post(
        "https://api.cloudinary.com/v1_1/dh8fzzd4h/image/upload",
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        },
      );
    });

    // Once all the files are uploaded
    axios.all(uploaders).then((response) => {
      response.forEach((file) => {
        uploadedFiles.push(file.data.secure_url);
      });
      setUploadedFiles(uploadedFiles);
      console.log(uploadedFiles);
      // eslint-disable-next-line react/destructuring-assignment
      props.getImageUrl(uploadedFiles);
    });
  };

  const clearFiles = () => {
    setFiles([]);
    setUploadedFiles([]);
  };

  const thumbs = files.map((file: any) => (
    <div
      className="inline-flex rounded-sm box-border mr-1 mb-1 p-0.5 w-24 h-24"
      key={file.name}
    >
      <div style={thumbInner}>
        <img
          alt="preview"
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: { preview: any }) =>
        URL.revokeObjectURL(file.preview),
      );
  }, [files]);

  // @ts-ignore
  return (
    <section className="container">
      {files.length > 0 ? (
        <div>
          <aside className="flex flex-row flex-wrap mt-1">{thumbs}</aside>
          <div className="flex mb-4 justify-around">
            <button
              onClick={clearFiles}
              type="button"
              className="text-orange-500"
            >
              <AiOutlineDelete className="w-6 h-6" />
            </button>
            <button
              onClick={uploadToCloudinary}
              type="button"
              className="text-green-500"
            >
              <AiOutlineUpload className="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : (
        <div style={dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
      )}
    </section>
  );
}

export default Dropzone;
