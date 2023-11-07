import { Router } from 'express';
import FollowControllers from '../controllers/FollowControllers';
import AuthMiddlewares from '../middlewares/JwtAuth';
import * as express from "express"

const FollowRoutes = express.Router();

FollowRoutes.post('/follow', AuthMiddlewares.Authentification, FollowControllers.follow)
FollowRoutes.get('/following', AuthMiddlewares.Authentification, FollowControllers.getFollowing)
FollowRoutes.get('/follower', AuthMiddlewares.Authentification, FollowControllers.getFollowers)


export default FollowRoutes;