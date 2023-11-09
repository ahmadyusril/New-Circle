import { Router } from "express";
import UserControllers from "../controllers/UserControllers";
import { upload } from "../middlewares/UploadFile";
import AuthMiddlewares from "../middlewares/JwtAuth";

const UserRouter = Router();

UserRouter.post("/user", UserControllers.create);
UserRouter.get("/users", AuthMiddlewares.Authentification, UserControllers.find);
UserRouter.get("/user/auth", AuthMiddlewares.Authentification, UserControllers.findByAuth);
UserRouter.get("/user/:id", AuthMiddlewares.Authentification, UserControllers.findById);
UserRouter.patch("/user/:id", upload("profile_picture"), UserControllers.update);
UserRouter.delete("/user/:id", UserControllers.delete);

export default UserRouter;