import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import { Request, Response } from "express";
import { createUserSchema, updateUserSchema } from "../utils/validator/User";
import { deleteFile } from "../utils/FileHelper";
import { uploadToCloudinary } from "../utils/Cloudinary";

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
            const user = await this.UserRepository.find();

            const followings = await this.UserRepository.query(
				"SELECT u.id, f.following_id, f.follower_id, u.username, u.full_name, u.profile_picture FROM following as f INNER JOIN user as u ON u.id=f.following_id"
			);
			const followers = await this.UserRepository.query(
				"SELECT u.id, f.following_id, f.follower_id, u.username, u.full_name, u.profile_picture FROM following as f INNER JOIN user as u ON u.id=f.follower_id "
			);

            const userMap = user.map((user) => {
				const followingsPersonal = followings.filter((following) => {
					return following.follower_id === user.id;
				});
				const followersPersonal = followers.filter((follower) => {
					return follower.following_id === user.id;
				});

				return {
					...user,
					followings: followingsPersonal,
					followers: followersPersonal,
				};
			});
            
            return res.status(200).json({
                status: "success",
                message: "Find user success",
                data: userMap, 
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
                where: { id },
            });

            if (!user) {
                return res.status(404).json({ error: "ID not found" });
            }

            const followings = await this.UserRepository.query(
				"SELECT u.id, u.username, u.full_name, u.profile_picture FROM following as f INNER JOIN user as u ON u.id=f.following_id WHERE f.follower_id=$1",
				[id]
			);
			const followers = await this.UserRepository.query(
				"SELECT u.id, u.username, u.full_name, u.profile_picture FROM following as f INNER JOIN user as u ON u.id=follower_id WHERE f.following_id=$1",
				[id]
			); 

            return res.status(200).json({
                status: "success",
                message: "Find user success",
                data: {
                    ...user,
                    followings,
                    followers,  
                }
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
            });

            if (!user)
				return res.status(400).json({
					Error: `User with ID ${res.locals.loginSession.user.id} not found`,
				});

			const followings = await this.UserRepository.query(
				"SELECT u.id, u.username, u.full_name, u.profile_picture, u.bio FROM following as f INNER JOIN user as u ON u.id=f.following_id WHERE f.follower_id=$1",
				[loginSession.user.id]
			);
            
			const followers = await this.UserRepository.query(
				"SELECT u.id, u.username, u.full_name, u.profile_picture, u.bio FROM following as f INNER JOIN user as u ON u.id=follower_id WHERE f.following_id=$1",
				[loginSession.user.id]
			);

            return res.status(200).json({
                status: "success",
                message: "find user by auth success",
                data: {
                    ...user,
                    followers,
                    followings,
                },
            });
        }   catch (error) {     
            return res.status(400).json({ Error: error.message });
        }
    } 

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
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
            let profile_picture = ""
            if (req.file?.filename) {
                // save to cloudinary
                profile_picture = await uploadToCloudinary(req.file);
                // delete file from local server after save to cloudinary
                deleteFile(req.file.path);
            }

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