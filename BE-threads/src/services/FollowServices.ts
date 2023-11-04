import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Request, Response } from "express";
import { Following } from "../entities/following";
import { User } from "../entities/user";

export default new class FollowService {
    private readonly FollowingRepository: Repository<Following>
        = AppDataSource.getRepository(Following);
    private readonly UserRepository: Repository<User>
        = AppDataSource.getRepository(User);

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            const following = await this.UserRepository.findOne({
                where: {
                    id: res.locals.loginSession.following_id
                }
            });
            const follower = await this.UserRepository.findOne({
                where: {
                    id: res.locals.loginSession.follower_id
                }
            });

            const newFollow = this.FollowingRepository.create({
                user: following,
                userd: follower,

            });
            const existingFollow = await this.FollowingRepository.findOne({
                where: {
                    user: following,
                    userd: follower,
                }
            });
    
            if (existingFollow) {
                return await this.FollowingRepository.delete(existingFollow)
                    .then(() =>
                        res.status(201).json({ message: "succesfully unfollowed" })
                    )
                    .catch((error) =>
                        res.status(500).json({
                            status: "Failed",
                            message: "Something error while unfollowing",
                            error,
                        })
                    );
            } else {
                return await this.FollowingRepository.save(newFollow)
                    .then(() =>
                        res.status(201).json({ message: "succesfully following" })
                    )
                    .catch((error) =>
                        res.status(500).json({
                            status: "Failed",
                            message: "Something error while following",
                            error,
                        })
                    );
            }

            // return await this.FollowingRepository.save(newFollow)
            //     .then(() =>
            //         res.status(201).json({ message: "succesfully following" })
            //     )
            //     .catch((error) =>
            //         res.status(500).json({
            //             status: "Failed",
            //             message: "Something error while following",
            //             error,
            //         })
            //     );
        } catch (error) {
            return res.status(500).json({ message: "Error while create following", error });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const following = await this.UserRepository.findOne({
                where: { id: id },
                relations: ["following", "follower"],
            })
            return res.status(200).json(following);
        } catch (error) {
            return res.status(500).json({ message: "Error while find following", error });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            const following = await this.UserRepository.findOne({
                where: { id: data.following_id },
                relations: ["following", "follower"],
            });
            if (!following) {
                return res.status(404).json({ message: "following not found" });
            }
            const follower = await this.UserRepository.findOne({
                where: { id: data.follower_id },
                relations: ["following", "follower"],
            });

            const deleteFollow = await this.UserRepository.remove(following);
            return res.status(200).json(deleteFollow);

        } catch (error) {
            return res.status(500).json({ message: "Error while delete following", error });
        }
    }
}