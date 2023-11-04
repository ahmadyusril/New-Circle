import { Request, Response } from "express";
import FollowServices from "../services/FollowServices";

export default new class FollowController {
    create(req: Request, res: Response) {
        FollowServices.create(req, res);
    }

    // delete(req: Request, res: Response) {
    //     FollowServices.delete(req, res);
    // }
}