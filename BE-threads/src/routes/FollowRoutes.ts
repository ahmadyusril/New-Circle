import * as express from 'express';
import FollowControllers from '../controllers/FollowControllers';

const FollowRoutes = express.Router();

FollowRoutes.post('/follow', FollowControllers.create)
// FollowRoutes.delete('/unfollow/:id', FollowControllers.delete)

export default FollowRoutes;