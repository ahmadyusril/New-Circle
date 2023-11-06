import { Router } from 'express';
import FollowControllers from '../controllers/FollowControllers';
import AuthMiddlewares from '../middlewares/JwtAuth';
import * as express from "express"

const FollowRoutes = express.Router();

FollowRoutes.post('/follow/:userId', AuthMiddlewares.Authentification, FollowControllers.follow)
// FollowRoutes.get('/follow/:id', AuthMiddlewares.Authentification, FollowControllers.findById)
// FollowRoutes.delete('/unfollow/:id', AuthMiddlewares.Authentification, FollowControllers.delete)

export default FollowRoutes;