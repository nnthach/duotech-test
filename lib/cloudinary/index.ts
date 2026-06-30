const uploadSingleFile = async (file: File) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Missing Cloudinary env");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are supported");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "duotech/products");
  formData.append("tags", "product,image");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || "Upload failed");
  }

  return data.secure_url;
};

export const uploadFileToCloudinary = async (file: File | File[] | null) => {
  if (!file) {
    throw new Error("Missing file");
  }

  if (Array.isArray(file)) {
    return Promise.all(file.map(uploadSingleFile));
  }

  return uploadSingleFile(file);
};
