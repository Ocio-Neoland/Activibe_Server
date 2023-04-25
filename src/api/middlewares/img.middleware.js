const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const dotenv = require("dotenv");
dotenv.config();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Ocioland",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "webp"],
  },
});

const upload = multer({ storage });

const deleteImgCloudinary = (imgUrl) => {
  const imgSplited = imgUrl.split("/");
  const nameSplited = imgSplited[imgSplited.length - 1].split(".");
  const folderSplited = imgSplited[imgSplited.length - 2];
  const public_id = `${folderSplited}/${nameSplited[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log("Image delete in cloudinary");
  });
};

const configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.NAME,
    api_secret: process.env.API_SECRET,
    api_key: process.env.API_KEY,
  });
};

module.exports = { upload, deleteImgCloudinary, configCloudinary };
