import { useState, ChangeEvent, useRef } from "react";
import { FiTrash2, FiUpload } from "react-icons/fi";
import axios from "axios";

function ProductImageUploadComponent(props: any) {
  const [imageSelected, setImageSelected] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState("");
  const imgRef = useRef<HTMLInputElement | null>(null);

  const handleChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<any> => {
    if (event.target.files) {
      // @ts-ignore
      setImageSelected(event.target.files[0]);
      const fileLoaded = URL.createObjectURL(event.target.files[0]);
      setFile(fileLoaded);
    }
  };

  const clearInput = () => {
    setFile("");
    if (imgRef.current) {
      imgRef.current.value = "";
    }
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ml_default");
    axios
      .post("https://api.cloudinary.com/v1_1/dh8fzzd4h/image/upload", formData)
      .then((res) => {
        if (res.status === 200) {
          setImageUrl(res.data.secure_url);
          // eslint-disable-next-line react/destructuring-assignment
          props.getImageUrl(res.data.secure_url);
        }
      });
  };

  return imageUrl.length > 0 ? (
    <p>{imageUrl}</p>
  ) : (
    <div>
      <img
        src={file}
        alt=""
        style={{
          display: "flex",
          maxWidth: "300px",
          maxHeight: "300px",
        }}
      />
      <div className="flex justify-between">
        <input
          ref={imgRef}
          type="file"
          onChange={handleChange}
          accept="image/jpg,.gif,.png,.svg,.jpg,.jpeg,.webp"
        />
        {file.length > 0 ? (
          <>
            <FiTrash2 onClick={clearInput} />
            <FiUpload onClick={uploadImage} />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ProductImageUploadComponent;
