import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: 'campus-store'
  });
  return res;
}

export async function handleDelete(filename) {
  const res = await cloudinary.uploader.destroy(filename, {
    folder: 'campus-store'
  });
  return res;
}