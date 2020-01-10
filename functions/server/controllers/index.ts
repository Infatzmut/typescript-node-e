import productController from './products';
import orderController from './orders'
import express from 'express';

const app = express();

app.use('/products', productController);
app.use('/orders', orderController);

export default app;
