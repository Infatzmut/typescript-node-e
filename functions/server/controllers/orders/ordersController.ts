import { baseController } from "../base.controller";
import { Request, Response} from 'express';
import {setupDbServices} from '../../services';

const dbservice = setupDbServices();

class OrdersController {
    async getAllUserOrders (req: Request, res: Response) {
        let responseCode;
        let responseData;
        const username = req.params.username.trim()
        if(username === ''){
            responseCode = 400;
            responseData = baseController.getErrorResponse("Must give an username")
        } else {
            try {
                const orders = await dbservice.ordersService.getOrdersOfUser(username);
                responseCode = orders.responseCode;
                responseData = baseController.getSuccessResponse(orders.data, orders.message);
            }catch(error){
                console.log("Error", error); 
                responseCode = 500
                responseData = baseController.getErrorResponse(`Error getting all the orders of ${username}`);
            }
        }
        return res.status(responseCode).json(responseData);
    }  
    
    async getAll (req: Request, res: Response) {
        let responseCode;
        let responseData;
        
        try{
            const allOrders = await  dbservice.ordersService.getAllOrders();
            responseCode = allOrders.responseCode
            responseData = baseController.getSuccessResponse(allOrders.data, allOrders.message);
        }catch(error){
            console.log("Error :", error);
            responseData = baseController.getErrorResponse("Error getting all the orders");
            
        }
        return res
            .status(responseCode).json(responseData);
    }
    
    async post (req: Request, res: Response) {
        let responseCode;
        let responseData;
        try{
            const orderCreated = await dbservice.sharedService.createOrder(req.body.order,req.body.details)
            responseCode = orderCreated.responseCode;
            responseData = baseController.getSuccessResponse(orderCreated.data, orderCreated.message);
        }catch(error){
            responseData = baseController.getErrorResponse("Error");
        }
        return res
            .status(responseCode).json(responseData);
    }

}

export const ordersController = new OrdersController();