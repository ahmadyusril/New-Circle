import { Router } from "express";
import ReplyControllers from "../controllers/ReplyControllers";
import AuthMiddlewares from "../middlewares/JwtAuth";
import { upload } from "../middlewares/UploadFile";

const ReplyRouter = Router();
// find all replies
ReplyRouter.get("/replies", ReplyControllers.find)

// create a reply
ReplyRouter.post(
    "/reply",
     AuthMiddlewares.Authentification,
     upload("image"),
     ReplyControllers.create)

// find a reply by id
ReplyRouter.get("/reply/:id", ReplyControllers.findById)

// update a reply
ReplyRouter.patch(
    "/reply/:id",
    upload("image"),
     ReplyControllers.update)

// delete a reply
ReplyRouter.delete("/reply/:id", ReplyControllers.delete)

export default ReplyRouter;