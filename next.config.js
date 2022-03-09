/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    // NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
    //   process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    // NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
    //   process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    // NEXT_PUBLIC_CLOUDINARY_SECRET: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET,
    // NEXT_PUBLIC_CLOUDINARY_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
  },
};
