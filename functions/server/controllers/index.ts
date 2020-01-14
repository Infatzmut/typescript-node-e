import productController from './products';
import orderController from './orders';
import usersController from './users';
import express from 'express';

const app = express();

app.use('/products', productController);
app.use('/orders', orderController);
app.use('/users', usersController);
export default app;
