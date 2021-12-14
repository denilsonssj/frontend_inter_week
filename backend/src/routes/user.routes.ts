import { Router } from 'express';

import userAuthenticated from '../middlewares/userAuthenticated';
import { UserController } from '../resources/user/user.controller';

const userRouter: Router = Router();
const userController: UserController = new UserController();

userRouter.post('/signin', userController.signin);
userRouter.get('/signup', userController.signup);
userRouter.get('/list', userController.list);
userRouter.get('/me', userAuthenticated, userController.me);

export default userRouter;