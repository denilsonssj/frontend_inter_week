import { Router } from 'express';
import pixRouter from './pix.routes';

import userRouter from './user.routes';

const router: Router = Router();

router.use('/user', userRouter);
router.use('/pix', pixRouter);

export default router;
