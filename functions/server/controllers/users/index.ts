import {Router } from 'express';
import {userController} from './users.controller';

const router:Router = Router();

router.post('/createUser', userController.createUser)
export default router;