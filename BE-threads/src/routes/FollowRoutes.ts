import { Router } from 'express';
import FollowControllers from '../controllers/FollowControllers';
import AuthMiddlewares from '../middlewares/JwtAuth';

const FollowRoutes = Router();

FollowRoutes.post('/follow', AuthMiddlewares.Authentification, FollowControllers.create)
FollowRoutes.get('/follow/:id', FollowControllers.findById)
FollowRoutes.delete('/unfollow/:id', FollowControllers.delete)

export default FollowRoutes;