import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadCloudenary = async (filePath) => {
  try {
    // configure cloudinary
    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.cloud_Api_key,
      api_secret: process.env.cloud_secret,
    });

    // upload file
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // delete local file safely
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return res.secure_url;
  } catch (error) {
    console.error("Cloudinary Error:", error);

    // only try to delete if file actually exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw error; // rethrow so you know upload failed
  }
};

export default uploadCloudenary;
