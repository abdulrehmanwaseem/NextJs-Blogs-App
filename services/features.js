import { getBase64 } from "@/lib/utils";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFilesToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      public_id: uuid(),
      type: "upload",
    });

    return { url: result.secure_url, public_id: result.public_id };
  } catch (error) {
    return null;
  }
};

export const deleteImageFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    console.log(result);
  } catch (error) {
    console.log("Error deleting image from Cloudinary:", error);
    return null;
  }
};
