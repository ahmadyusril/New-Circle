import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import { Request, Response } from "express";
import { createUserSchema, updateUserSchema } from "../utils/validator/User";
import { deleteFile } from "../utils/FileHelper";
// import { uploadToCloudinary } from "../utils/Cloudinary";
import { v2 as cloudinary} from "cloudinary"

export default new class UserService {
    private readonly UserRepository: Repository<User> = 
        AppDataSource.getRepository(User);
    
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;

            const { error, value } = createUserSchema.validate(data);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const existingUser = await this.UserRepository.findOne({
                where: [{ username: value.username}, {email: value.email}]
            });

            if (existingUser) {
                return res.status(400).json({ error: "User already exist" });
            }

            const obj = await this.UserRepository.create({
                full_name: value.full_name,
				username: value.username,
				email: value.email,
				password: value.password,
				profile_picture: value.profile_picture,
				profile_description: value.profile_description,
            });
            const createUser = await this.UserRepository.save(obj);
            return res.status(200).json(createUser);
        }   catch (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
    }

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const user = await this.UserRepository.find({
                relations: ['following', 'follower','threads'],
            });
            
            return res.status(200).json({
                status: "success",
                message: "Find user success",
                data: user
            });
        }   catch (error) {
            console.log(error);
            
            return res.status(500).json({ error: "Error while find users" });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const user = await this.UserRepository.findOne({
                where: { id: id },
                relations: ['following', 'follower','threads']
            });

            if (!user) {
                return res.status(404).json({ error: "ID not found" });
            }

            return res.status(200).json({
                status: "success",
                message: "Find user success",
                data: user
            });
        }   catch (error) {        
            return res.status(500).json({Error: `Error while find user by id ${error.message}` });
        }
    } 

    async findByAuth(req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession;
            const user: User | null = await this.UserRepository.findOne({
                where: {
                    id: loginSession.user.id,
                },
                relations: ['following', 'follower','threads']
            });

            if (!user)
				return res.status(400).json({
					Error: `User with ID ${res.locals.loginSession.user.id} not found`,
				});

			// const followings = await this.UserRepository.query(
			// 	"SELECT u.id, u.username, u.full_name, u.profile_picture, u.bio FROM following as f INNER JOIN user as u ON u.id=f.following_id WHERE f.follower_id=$1",
			// 	[loginSession.user.id]
			// );
            
			// const followers = await this.UserRepository.query(
			// 	"SELECT u.id, u.username, u.full_name, u.profile_picture, u.bio FROM following as f INNER JOIN user as u ON u.id=follower_id WHERE f.following_id=$1",
			// 	[loginSession.user.id]
			// );

            return res.status(200).json({
                status: "success",
                message: "find user by auth success",
                data: user
            });
        }   catch (error) {     
            return res.status(400).json({ Error: error.message });
        }
    } 

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const profile_picture = res.locals.filename
            const data = req.body;
            const { error } = updateUserSchema.validate(data);
            if (error) {
                return res.status(400).json({ error: error });
            }

            const user = await this.UserRepository.findOne({
                where: {id:id}
            })

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            console.log(data);
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });

            const cloudinaryResponse = await cloudinary.uploader.upload(
                `src/uploads/${profile_picture}`, { folder: "threads" }
            );
            console.log("cloudinary response", cloudinaryResponse);

            deleteFile(req.file.path);

            const { username, full_name, email, password, profile_description } = req.body;
            user.username = username;
            user.full_name = full_name;
            user.email = email;
            user.password = password;
            user.profile_description = profile_description;
            user.profile_picture = profile_picture;

            if (!user) {
                return res.status(400).json({ error: "User not found" });
            }
           
            const updateUser = await this.UserRepository.save(user);
            return res.status(200).json({ message: "User updated successfully", user: updateUser });
        }   catch (error) {
            console.log(error);
            return res.status(400).json({ error: error });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const user = await this.UserRepository.findOne({
                where: {id:id},
            });
            console.log(user);
            
            const deleteUser = await this.UserRepository.delete(user);
            return res.status(200).json(deleteUser);
        }   catch (error) {
            return res.status(400).json({ error: error.details[0].message})
        }
    }  
}