import {Router} from 'express';
import {productController} from './productController';

const router: Router = Router();

router.get('/:id', productController.get);
router.delete('/:id', productController.del);
router.put('/:id', productController.update);

export default router;