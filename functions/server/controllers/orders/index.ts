import {Router} from 'express';
import {orderController} from './orderController';
import {ordersController} from './ordersController';
import {checkAuthorization, checkIfAdmin} from '../middlewares'

const router: Router = Router();

router.get('/all',checkIfAdmin, ordersController.getAll);
router.get('/users/:username',checkAuthorization, ordersController.getAllUserOrders);
router.post('/',checkAuthorization, ordersController.post);
router.put('/:id',checkIfAdmin, orderController.update);
router.get('/:id/details',checkAuthorization, orderController.getOrderDetails);

export default router;