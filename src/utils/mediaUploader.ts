const mediaUploader = async (files: File[]) => {
  const media = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    // @ts-ignore
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
    // @ts-ignore
    formData.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME);
  }

  try {
    // @ts-ignore
    const res = await fetch(process.env.CLOUDINARY_URL, {
      method: "POST",
      body: FormData,
    });
    const data = await res.json();
    media.push(data.secure_url);
  } catch (error: any) {
    throw new Error(error);
  }

  return media;
};

export default mediaUploader;
