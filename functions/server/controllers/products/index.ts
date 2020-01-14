import {Router} from 'express';
import {productController} from './productController';
import {productsController} from './products.controller';
import {checkIfAdmin} from '../middlewares';
const router: Router = Router();

router.get('/',productsController.get);
router.get('/:id', productController.get);
router.post('/',checkIfAdmin, productsController.post);
router.delete('/:id',checkIfAdmin, productController.del);
router.put('/:id',checkIfAdmin, productController.update);

export default router;