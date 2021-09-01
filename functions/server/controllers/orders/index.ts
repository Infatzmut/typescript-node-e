import {Router} from 'express';
import {orderController} from './orderController';
import {ordersController} from './ordersController';

const router: Router = Router();

router.get('/all', ordersController.getAll)
router.get('/all', ordersController.getAll);
router.get('/users/:username', ordersController.getAllUserOrders);
// router.get('/users/:username/:id',orderController.get);
router.post('/', ordersController.post);
router.put('/:id', orderController.update);
router.get('/:id/details', orderController.getOrderDetails);

export default router;