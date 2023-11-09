import * as express from 'express'
import ThreadController from "../controllers/ThreadController";
import AuthMiddlewares from "../middlewares/JwtAuth";
import { upload } from '../middlewares/UploadFile';

const ThreadRoute = express.Router();

// find all threads
ThreadRoute.get("/threads", ThreadController.find)

// create a thread
ThreadRoute.post(
    "/thread", 
    AuthMiddlewares.Authentification, 
    upload("image"), 
    ThreadController.create)

// find a thread by id
ThreadRoute.get("/thread/:id",ThreadController.findById)

// update a thread
ThreadRoute.patch("/thread/:id", 
AuthMiddlewares.Authentification, 
upload("image"),
 ThreadController.update)
 
// delete a thread
ThreadRoute.delete("/thread/:id", ThreadController.delete)

export default ThreadRoute;