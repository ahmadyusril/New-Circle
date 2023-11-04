import { Router } from "express";
import LikeControllers from "../controllers/LikeControllers";
import AuthMiddlewares from "../middlewares/JwtAuth";

const LikeRouter = Router();
LikeRouter.get("/likes", LikeControllers.find)
LikeRouter.post("/like", AuthMiddlewares.Authentification, LikeControllers.create)
LikeRouter.get("/like/:id", LikeControllers.findById)
LikeRouter.delete("/like/:id", LikeControllers.delete)

export default LikeRouter;