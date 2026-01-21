import cloudinary from "../config/cloudinary";

export const uploadImageToCloudinary = async (fileBuffer: Buffer) => {
  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "products" }, (error, result) => {
        if (error || !result) {
          return reject(new Error("Image upload failed"));
        }
        resolve(result.secure_url);
      })
      .end(fileBuffer);
  });
};
