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
// this is a test change to see if is reflected on the mirror repository
export default router;