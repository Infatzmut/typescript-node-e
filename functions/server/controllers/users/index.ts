import {Router } from 'express';
import {userController} from './users.controller';

const router:Router = Router();

router.post('/', userController.post);

export default router;