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
            const following = await this.UserRepository.findOneBy({
                id: data.following_id
            });
            const follower = await this.UserRepository.findOneBy({
                id: data.follower_id
            });

            const followingColumn = this.FollowingRepository.create({
                user: following,
                userd: follower
            });

            return await this.FollowingRepository.save(followingColumn)
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
        }   catch (error) {
            return res.status(500).json({ message: "Error while create following", error });
        }
    }

    // async delete(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const data = req.body;
    //         const following = await this.UserRepository.findOneBy({
    //             id: data.following_id
    //         });
    //         const follower = await this.UserRepository.findOneBy({
    //             id: data.follower_id
    //         });
    //     }
    // }
}