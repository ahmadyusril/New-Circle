import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entities/user";

export default new class FollowService {
    private readonly UserRepository: Repository<User>
        = AppDataSource.getRepository(User);

    async follow(req: Request, res: Response): Promise<Response> {
        try {
            const userId = Number(req.params.userId);
            const user = res.locals.loginSession;

            if (userId) {
                console.log(userId);

                return res.status(400).json({ Error: `ID not valid` });
            }
            const following: User | null = await this.UserRepository.findOne({
                where: {
                    id: userId,
                },
            });
            if (!following) {
                return res.status(400).json({
                    Error: `User with ID ${userId} not found`,
                });
            }
            const follower: User | null = await this.UserRepository.findOne({
                where: {
                    id: user.user.id,
                },
            });
            if (!follower) {
                return res.status(400).json({
                    Error: `User with ID ${res.locals.loginSession.user.id} not found`,
                });
            }

            if (follower.id === following.id) {
                return res.status(400).json({
                    Error: `You can't follow yourself`,
                })
            }

            const checkFollow = await this.UserRepository.query(
                "SELECT * FROM following WHERE following_id=$1 AND follower_id=$2",
                [following.id, follower.id],
            );

            if (checkFollow.length) {
                await this.UserRepository.query(
                    "DELETE FROM following WHERE following_id=$1 AND follower_id=$2",
                    [following.id, follower.id],
                );

                return res.status(200).json({
                    status: "success",
                    message: "undo follow user success",
                });

            }

            await this.UserRepository.query(
                "INSERT INTO following(following_id, follower_id) VALUES($1, $2)",
				[following.id, follower.id]
            );
            return res.status(200).json({
                status: "Success",
                message: "Following",
            });

        } catch (error) {
            return res.status(500).json({ message: "Error while create following", error });
        }
    }

    // async findById(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const id = Number(req.params.id);
    //         const following = await this.UserRepository.findOne({
    //             where: { id: id },
    //             relations: {
    //                 following: true,
    //                 follower: true,
    //             }
    //         })
    //         return res.status(200).json(following);
    //     } catch (error) {
    //         return res.status(500).json({ message: "Error while find following", error });
    //     }
    // }

    // async delete(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const data = req.body;
    //         const following = await this.UserRepository.findOne({
    //             where: { id: data.following_id },
    //             relations: ["following", "follower"],
    //         });
    //         if (!following) {
    //             return res.status(404).json({ message: "following not found" });
    //         }
    //         const follower = await this.UserRepository.findOne({
    //             where: { id: data.follower_id },
    //             relations: ["following", "follower"],
    //         });

    //         const deleteFollow = await this.UserRepository.remove(following);
    //         return res.status(200).json(deleteFollow);

    //     } catch (error) {
    //         return res.status(500).json({ message: "Error while delete following", error });
    //     }
    // }
}