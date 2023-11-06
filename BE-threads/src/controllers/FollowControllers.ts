import { Request, Response } from "express";
import FollowServices from "../services/FollowServices";

export default new class FollowController {
    follow(req: Request, res: Response) {
        FollowServices.follow(req, res);
    }
    // findById(req: Request, res: Response) {
    //     FollowServices.findById(req, res)
    // }

    // delete(req: Request, res: Response) {
    //     FollowServices.delete(req, res);
    // }
}