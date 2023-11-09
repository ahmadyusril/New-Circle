import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

export default new (class CloudinaryConfig {
	upload() {
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});
	}

	async destination(image: any) {
		try {
			const cloudinaryResponse = await cloudinary.uploader.upload(
				"src/Upload/" + image,
				{
					folder: "circle-app",
				}
			);
			return cloudinaryResponse.secure_url;
		} catch (err) {
			throw err;
		}
	}
});

// import { v2 as cloudinary } from "cloudinary";
// import * as dotenv from "dotenv";

// dotenv.config();

// export const uploadToCloudinary = (
//   file: Express.Multer.File
// ): Promise<string> => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

//   return new Promise((resolve, reject) => {
//     const opt = { folder: "threads" };

//     cloudinary.uploader.upload(file.path, opt, function (error, result) {
//       if (error) {
//         return reject(error);
//       }
//       return resolve(result.secure_url);
//     });
//   });
// };