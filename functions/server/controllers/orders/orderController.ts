import { baseController } from "../base.controller";
import { Request, Response} from 'express';
import {setupDbServices} from '../../services';

const dbservice = setupDbServices();

class OrderController {
    async update (req: Request, res: Response) {
        let responseCode;
        let responseData;
        const { id } = req.params;
        const { status } = req.body;
        
        if(!status || status.trim() === ''){
            responseCode = 400;
            responseData = baseController.getErrorResponse("Bad status request");
        } else {
            try {
                const order = await dbservice.ordersService.updateOrder(id,status);
                responseCode = order.responseCode;
                responseData = baseController.getSuccessResponse(order.data, order.message);
            } catch(error){
                responseCode = 500;
                responseData = baseController.getErrorResponse(error.message);
            }
        }
        return res.status(responseCode).json(responseData)
    }
    
    async get (req: Request, res: Response) {
        let responseCode;
        let responseData;
        const { id } = req.params;
        try{
            const order = await dbservice.ordersService.getOrdersOfUser(id);
            responseCode = order.responseCode;
            responseData = baseController.getSuccessResponse(order.data, order.message)
        } catch(error){
            responseCode = 500;
            responseData = baseController.getErrorResponse(error.message);
        }
        return res.status(responseCode).json(responseData);
    }
    
    async getOrderDetails (req: Request, res: Response) {
        let responseCode;
        let responseData;
        const { id } = req.params
        try{
            const orderDetails = await dbservice.orderDetailsService.getDetails(id);
            responseCode = orderDetails.responseCode;
            responseData = baseController.getSuccessResponse(orderDetails.data, orderDetails.message);
        } catch(error) {
            responseCode = 500;
            responseData = baseController.getErrorResponse(error.message);
        }
        return res.status(responseCode).json(responseData);
    }
}


export const orderController = new OrderController();