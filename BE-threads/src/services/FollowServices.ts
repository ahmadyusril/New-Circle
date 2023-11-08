import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entities/user";
import { followingSchema } from "../utils/validator/Follow";

export default new class FollowService {
    private readonly UserRepository: Repository<User>
        = AppDataSource.getRepository(User);

    async follow(req: Request, res: Response): Promise<Response> {
        try {
            const userId = res.locals.loginSession.user.id; // Pengguna yang melakukan tindakan follow

            // const { user_id } = req.body;

            const { error, value } = followingSchema.validate(req.body);

            if (error) {
                return res.status(400).json({
                    code: 400,
                    message: 'Invalid input. Please provide a valid user_id.'
                });
            }

            const user = await this.UserRepository.findOne({
                where: {
                    id: userId
                },
                relations: ['following']
            });
            const userToFollow = await this.UserRepository.findOne({
                where: {
                    id: value.user
                },
            });

            if (!user || !userToFollow) {
                return res.status(404).json({
                    code: 404, message: 'User not found'
                });
            }

            // Check if the user is already following the target user
            const isAlreadyFollowing = user.following.some(
                (followedUser) => followedUser.id === value.user
            );

            if (isAlreadyFollowing) {
                // If already following, unfollow
                user.following = user.following.filter(
                    (followedUser) => followedUser.id !== value.user
                );
            } else {
                // If not following, follow
                user.following.push(userToFollow);
            }

            await this.UserRepository.save(user);

            const message = isAlreadyFollowing 
            ? 'User unfollowed successfully' 
            : 'User followed successfully';
            return res.status(200).json({ code: 200, message });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ code: 500, message: error });
        }
    }

    async getFollowing(req: Request, res: Response): Promise<Response> {
        try {
            const userId = res.locals.loginSession.user.id;
            const user = await this.UserRepository.findOne({
                where: {
                    id: userId,
                },
                relations: ["following"]
            });

            if (!user) {
                return res.status(404).json({ code: 404, message: `User not found` });
            }
            return res.status(200).json({ code: 200, data: user.following });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ code:500, message: `Something wrong while get following` });
        }
    }

    async getFollowers(req: Request, res: Response): Promise<Response> {
        try {
            const userId = res.locals.loginSession.user.id;
            const user = await this.UserRepository.findOne({
                where: {
                    id: userId,
                },
                relations: ["follower"]
            });

            if (!user) {
                return res.status(404).json({ Error: `User not found` })
            }
            return res.status(200).json({ status: "success", data: user.follower });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: `Something wrong while get followers` });
        }
    }
}();