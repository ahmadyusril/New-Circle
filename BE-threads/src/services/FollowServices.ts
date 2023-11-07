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
            const userId = res.locals.loginSession.user.id;
            const { error, value } = followingSchema.validate(req.body);
            // const user = res.locals.loginSession;

            if (error) {
                console.log(error);

                return res.status(400).json({ Error: `ID not valid` });
            }
            const user = await this.UserRepository.findOne({
                where: {
                    id: userId,
                },
                relations: ["following"]
            });
            const userToFollow = await this.UserRepository.findOne({
                where: {
                    id: value.user,
                },
            });
            if (!user || !userToFollow) {
                return res.status(404).json({
                    Error: `User not found`,
                });
            }

            const checkFollow = user.following.some(
               (followedUser) => followedUser.id === value.user
            );

            if (checkFollow) {
                user.following = user.following.filter(
                    (followedUser) => followedUser.id !== value.user
                );
            }   else {
                user.following.push(userToFollow);
            }

            await this.UserRepository.save(user);

            const message = checkFollow
            ? "Unfollowed"
            : "Followed"
        
            return res.status(200).json({
                status: "Success",
            });

        } catch (error) {
            return res.status(500).json({ message: "Error while create following", error });
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
                return res.status(404).json({ Error: `User not found` });
            }
            return res.status(200).json({data: user.following});
        } catch(error) {
            console.log(error);
            return res.status(500).json({ Error: `Something wrong while get following` });       
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
                return res.status(404).json({ Error: `User not found`})
            }
            return res.status(200).json({ status: "success", data: user.follower });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: `Something wrong while get followers` });
        }
    }
}();