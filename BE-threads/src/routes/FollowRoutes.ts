import { Router } from 'express';
import FollowControllers from '../controllers/FollowControllers';
import AuthMiddlewares from '../middlewares/JwtAuth';

const FollowRoutes = Router();

FollowRoutes.post('/follow/:id', AuthMiddlewares.Authentification, FollowControllers.create)
FollowRoutes.get('/follow/:id', AuthMiddlewares.Authentification, FollowControllers.findById)
FollowRoutes.delete('/unfollow/:id', AuthMiddlewares.Authentification, FollowControllers.delete)

export default FollowRoutes;