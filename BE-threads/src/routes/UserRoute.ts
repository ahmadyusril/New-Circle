import * as express from "express";
import { Router } from "express";
import UserControllers from "../controllers/UserControllers";
import UploadFileMiddleware from "../middlewares/UploadFile";

const UserRouter = Router();

UserRouter.post("/user", UserControllers.create);
UserRouter.get("/users", UserControllers.find);
UserRouter.get("/user/:id", UserControllers.findById);
UserRouter.patch("/user/:id", UploadFileMiddleware.single("profile_picture"), UserControllers.update);
UserRouter.delete("/user/:id", UserControllers.delete);

export default UserRouter;