import { Request, Response } from "express";
import ThreadService from "../services/ThreadService";
import ThreadQueue from "../queue/ThreadQueue";

export default new class ThreadController {
    create(req: Request, res: Response) {
        ThreadQueue.create(req, res)
    }
    
    findById(req: Request, res: Response) {
        ThreadService.findById(req, res)
    }
    
    find(req: Request, res: Response) {
        ThreadService.find(req, res);
    }

    update(req: Request, res: Response) {
        ThreadService.update(req, res);
    }

    delete(req: Request, res: Response) {
        ThreadService.delete(req, res);
    }
}